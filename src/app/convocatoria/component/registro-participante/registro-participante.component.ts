import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListasService} from '../../services/listas.service'
import { ConvocatoriaService} from '../../services/convocatoria.service'
import { Item } from 'src/app/convocatoria/model/item'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {ConfirmacionComponent} from 'src/app/widgets/confirmacion/confirmacion.component';
import {CustomModalComponent,TipoMensajeEnum} from 'src/app/widgets/custom-modal/custom-modal.component';
import {Inscripcion} from '../../model/dtos/inscripcion';
import { RespuestaTransaccion } from '../../model/dtos/respuesta-transaccion';
import { Router } from '@angular/router';
import { Convocatoria } from '../../model/dtos/convocatoria';

@Component({
  selector: 'app-registro-participante',
  templateUrl: './registro-participante.component.html',
  styleUrls: ['./registro-participante.component.css']
})
export class RegistroParticipanteComponent  implements OnInit {

  public registroForm: FormGroup;
  public nonSelectedOptionValue: string = '';
  public lPerfiles: Item[] = [];
  public lPaises: Item[] = [];
  descripcionPerfil : string | undefined = '';
  selectedPerfil:any = null;
  isCheckedPoliticas:boolean=false;
  isCheckedTerminos:boolean=false;
  isCheckedCorreos:boolean=false;
  isCheckedCustodiar:boolean=false;
  isCheckedVeraz:boolean=false;
  disableSave:boolean=false;
  public selectedConvocatoria:string='1';
  patronEmail = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  conovocatorias: Convocatoria[] = [{codigo: '1', nombre: 'Convocatoria 02046', fechaInicio:'', fechaFin:'', activo: true}];
  selectedOption: string = 'Opción 2'; // Valor por defecto
  constructor(
    private formBuilder: FormBuilder,
    private listaService: ListasService,
    private convocatoriaService: ConvocatoriaService,
    public _dialog: MatDialog,
    private router: Router
    ){
      
      this.disableSave = false;
    this.registroForm = this.formBuilder.group({
      codigoConvocatoria: ['1', Validators.required],
      codigoPerfil:['', Validators.required],
      tipoIdentificacion:['', Validators.required],
      identificacion:['', Validators.required],
      nombres:['', Validators.required],
      apellidos:['', Validators.required],
      email:['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.patronEmail)],],
      telefono:['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9_ ]*$')],],
      descripcion:[{value: '', disabled: true}],
      aceptoPoliticas:['', Validators.required],
      aceptoTerminos:['', Validators.required],
      aceptoCorreos:['', Validators.required],
      aceptoVeraz:['', Validators.required],
      aceptoCustodiar:['', Validators.required]
     });
     this.selectedConvocatoria = '1';
  }

  ngOnInit(): void {
    this.validarConvocatoria("1");
  }
  validarConvocatoria(codigoConvocatoria:string){
    this.convocatoriaService
                  .getConvocatoria(codigoConvocatoria)
                  .subscribe((convocatoria:Convocatoria)=>{
                      if(!convocatoria.activo){
                        this.deshabilitarFormulario();
                      }
                      else{
                        this.getPerfiles();
                      }
                  });
  }

public saveInscripcion():void {
    if(this.registroForm.valid){
      this.disableSave = true;
      const dialogRef = this._dialog.open(ConfirmacionComponent, {
                width: '95%',
                maxHeight: '95vh',
                disableClose: true,
                data: {
                  titulo: "Guardar Inscripción",
                  mensaje: "¿Esta seguro de registrar la inscripción con los datos ingresados?"
                }
              });

        dialogRef.afterClosed().subscribe((response: boolean) => {
          if (response && response == true) {
                  let dto: Inscripcion = new Inscripcion({
                  codigoConvocatoria : this.registroForm.controls["codigoConvocatoria"].value,
                  codigoPerfil : this.registroForm.controls["codigoPerfil"].value,
                  tipoIdentificacion : this.registroForm.controls["tipoIdentificacion"].value,
                  identificacion : this.registroForm.controls["identificacion"].value,
                  nombres : this.registroForm.controls["nombres"].value,
                  apellidos : this.registroForm.controls["apellidos"].value,
                  email : this.registroForm.controls["email"].value,
                  telefono : this.registroForm.controls["telefono"].value
                });

                  this.convocatoriaService
                  .saveInscripcion(dto)
                  .subscribe((result:RespuestaTransaccion)=>{
  
                        if(result.error=='NO'){
                          this.deshabilitarFormulario();
                          var dConfirm = this._dialog.open(CustomModalComponent,
                                { width: '450px',
                                  data: {
                                  mensaje: "Se ha generado el siguiente código de inscripcion \n "+ result.respuesta,
                                  tipoMensaje: TipoMensajeEnum.success
                                }
                              });  

                            dConfirm.afterClosed().subscribe(result => {
                                  this.router.navigate(['/convocatoria/documentos']);
                                });
                        }else{
                          this.disableSave = false;
                          var dConfirmError = this._dialog.open(CustomModalComponent,
                                { width: '450px',
                                  data: {
                                    mensaje: "¡Atención!: \n "+ result.errorDetail,
                                  tipoMensaje: TipoMensajeEnum.success
                                }
                              });  

                            dConfirmError.afterClosed().subscribe(result => {
                                  this.disableSave = false;
                                });
                        }
                  });
            }
            else{
              this.disableSave = false;
            }
        });
  }
}

  deshabilitarFormulario() {
    Object.keys(this.registroForm.controls).forEach(controlName => {
      this.registroForm.controls[controlName].disable();
    });
    this.disableSave=true;
  }
  
  private getPerfiles() {
       this.registroForm.controls['codigoPerfil'].setValue(
          this.nonSelectedOptionValue
        );
    
        this.listaService
          .getPerfiles()
          .subscribe({
                  next: (data) => { 
                    this.lPerfiles = data;
                      },
                  error: (error) => {
                  },
                    });
  }

  public onChangePerfil(event: any) {
    let perfiles = this.lPerfiles.slice();
    let perfil = perfiles.find( p => p?.codigo === this.selectedPerfil);
    this.descripcionPerfil = "";
    this.descripcionPerfil = perfil?.descripcion;
  }
}
