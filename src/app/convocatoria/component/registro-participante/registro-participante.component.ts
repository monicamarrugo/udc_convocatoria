import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListasService} from '../../services/listas.service'
import { ConvocatoriaService} from '../../services/convocatoria.service'
import { Item } from 'src/app/convocatoria/model/item'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {ConfirmacionComponent} from 'src/app/widgets/confirmacion/confirmacion.component';
import {CustomModalComponent,TipoMensajeEnum} from 'src/app/widgets/custom-modal/custom-modal.component';
import {Inscripcion} from '../../model/dtos/inscripcion';
import { RespuestaTransaccion } from '../../model/respuesta-transaccion';
import { Router } from '@angular/router';

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

  constructor(
    private formBuilder: FormBuilder,
    private listaService: ListasService,
    private convocatoriaService: ConvocatoriaService,
    public _dialog: MatDialog,
    private router: Router
    ){
    this.registroForm = this.formBuilder.group({
      codigoConvocatoria: ['', Validators.required],
      codigoPerfil:['', Validators.required],
      tipoIdentificacion:['', Validators.required],
      identificacion:['', Validators.required],
      nombres:['', Validators.required],
      apellidos:['', Validators.required],
      email:['', Validators.required],
      telefono:['', Validators.required]
     });
  }

  ngOnInit(): void {
    this.getPerfiles();
  }

public saveInscripcion():void {
  console.log("entró");
    if(this.registroForm.valid){
      console.log("valid");
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
                  let dto: Inscripcion = new Inscripcion(this.registroForm.getRawValue());
  
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

                          this._dialog.open(CustomModalComponent,
                                { width: '450px',
                                  data: {
                                    mensaje: "Se ha generado el siguiente error: \n "+ result.errorDetail,
                                  tipoMensaje: TipoMensajeEnum.success
                                }
                              });  
                        }
  
                        
                    
                  });
                  }
        });
  }
}

  deshabilitarFormulario() {
    Object.keys(this.registroForm.controls).forEach(controlName => {
      this.registroForm.controls[controlName].disable();
    });
  }



  private getPerfiles() {
       this.registroForm.controls['codigoPerfil'].setValue(
          this.nonSelectedOptionValue
        );
    
        this.listaService
          .getPerfilesMock()
          .subscribe({
                  next: (data) => { 
                    this.lPerfiles = data;
                      },
                  error: (error) => {
                  },
                    });
  }

 

}
