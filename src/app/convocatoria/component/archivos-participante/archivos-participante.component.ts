import { Component, OnInit } from '@angular/core';
import { RespuestaTransaccion } from '../../model/dtos/respuesta-transaccion';
import { ResponseDocumento } from '../../model/response-documento';
import { DocumentosService} from '../../services/documentos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Documento} from '../../model/dtos/documento';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {ConfirmacionComponent} from 'src/app/widgets/confirmacion/confirmacion.component';
import {CustomModalComponent,TipoMensajeEnum} from 'src/app/widgets/custom-modal/custom-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/convocatoria/model/item';
import { ListasService} from '../../services/listas.service';
import { Convocatoria } from '../../model/dtos/convocatoria';
import { ConvocatoriaService } from '../../services/convocatoria.service';

@Component({
  selector: 'app-archivos-participante',
  templateUrl: './archivos-participante.component.html',
  styleUrls: ['./archivos-participante.component.css']
})
export class ArchivosParticipanteComponent  implements OnInit {

  selectedFile: File | null = null;
  uploadResponse: RespuestaTransaccion | null = null;
  public documentoForm: FormGroup;
  public nonSelectedOptionValue: string = '';
  public dataSource: MatTableDataSource<ResponseDocumento>;
  public codigoConvocatoria:string='';
  public lTiposDocumento: Item[] = [];
  public lDocumentosSubidos: Item[] = [];
  public displayedColumns: string[] = [
    'contenido',
    'descTipodocumento'
   ];
   groupColumns = ['tipoDocumento'];
   dataColumns = ['contenido', 'descTipodocumento'];
   disableSave:boolean=false;
   conovocatorias: Convocatoria[] = [{codigo: '1', nombre: 'Convocatoria 02046', fechaInicio:'', fechaFin:'', activo: true}];
   public selectedConvocatoria:string='1';
   codigoEnMayusculas: string = '';

  constructor(
    private documentoService: DocumentosService,
    private formBuilder: FormBuilder,
    private listaService: ListasService,
    private convocatoriaService: ConvocatoriaService,
    public _dialog: MatDialog){
    
      this.dataSource = new MatTableDataSource<ResponseDocumento>([]);
    this.documentoForm = this.formBuilder.group({
      codigoInscripcion: [this.codigoEnMayusculas, Validators.required],
      tipoDocumento:['', Validators.required],
      archivo:['', Validators.required],
      convocatoria:['1', Validators.required]
     });
     this.disableSave=false;
     this.selectedConvocatoria='1';
  }

  ngOnInit(): void {
   this.validarConvocatoria('1');
  }
  validarConvocatoria(codigoConvocatoria:string){
    this.convocatoriaService
                  .getConvocatoria(codigoConvocatoria)
                  .subscribe((convocatoria:Convocatoria)=>{
                      if(!convocatoria.activo){
                        this.deshabilitarFormulario();
                      }
                      else{
                        this.getTiposDocumento();
                      }
                  });
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    const maxSizeInBytes = 5242880;
    if (selectedFile.size > maxSizeInBytes) {
      var dConfirm = this._dialog.open(CustomModalComponent,
            { width: '450px',
              data: {
              mensaje: "El archivo seleccionado supera el tamaño máximo permitido!",
              tipoMensaje: TipoMensajeEnum.warning
            }
          });
        dConfirm.afterClosed().subscribe(result => {
          this.documentoForm.controls['archivo'].setValue(
            this.nonSelectedOptionValue
          );
          this.selectedFile = null;
      
        });
    }
    if (selectedFile && selectedFile.type === 'application/pdf'){
      this.selectedFile = event.target.files[0];
    }else{
      var dConfirm = this._dialog.open(CustomModalComponent,
            { width: '450px',
              data: {
              mensaje: "Solo se permite documentos de tipo PDF!",
              tipoMensaje: TipoMensajeEnum.warning
            }
          });
        dConfirm.afterClosed().subscribe(result => {
          this.documentoForm.controls['archivo'].setValue(
            this.nonSelectedOptionValue
          );
          this.selectedFile = null;
      
        });
    }
  }
  listDocumento(){
    
    let codigo = this.documentoForm.controls["codigoInscripcion"].value.toUpperCase();
    if(codigo){
      this.codigoEnMayusculas = this.codigoEnMayusculas.toUpperCase();
      this.documentoService.listDocumento(codigo)
      .subscribe({
        next: (documentos: ResponseDocumento[]) => {     
          if (documentos.length > 0) {
            this.dataSource.data = documentos;
            this.verificarSubidos(documentos.slice());
          } else {
            this.dataSource.data = [];
            this.verificarSubidos([]);
          }
        }
    });
  }
  }
  verificarSubidos(documentosSubidos:ResponseDocumento[]){
      this.lDocumentosSubidos = this.lTiposDocumento.slice();
      if(documentosSubidos.length > 0){
          this.lDocumentosSubidos.find( d => {
            if(documentosSubidos.some(s => s.tipoDocumento === d.codigo)){
              d.subido=true;
            }
            else{
              d.subido=false;
            }
          });
      }else{
        this.lDocumentosSubidos.forEach( d => {
            d.subido=false;
        });
      }
  }
  private getTiposDocumento() {
    this.documentoForm.controls['tipoDocumento'].setValue(
       this.nonSelectedOptionValue
     );
 
     this.listaService
       .getTiposDocumento()
       .subscribe({
               next: (data) => { 
                 this.lTiposDocumento = data;
                 this.verificarSubidos([]);
                   },
               error: (error) => {
               },
                 });
}

  saveDocumento() {
    if (!this.selectedFile) return;
    if(!this.documentoForm) return;
    if(!this.documentoForm.valid) return;

    this.disableSave=true;
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('codigoInscripcion', this.documentoForm.controls["codigoInscripcion"].value.toUpperCase());
    formData.append('tipoDocumento', this.documentoForm.controls["tipoDocumento"].value);

        const dialogRef = this._dialog.open(ConfirmacionComponent, {
                  width: '95%',
                  maxHeight: '95vh',
                  disableClose: true,
                  data: {
                    titulo: "Guardar Documento",
                    mensaje: "¿Esta seguro de guardar el documento ingresado?"
                  }
        });

          dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response && response == true) {
                this.documentoService.saveDocumento(formData)
                  .subscribe(response => {
                    this.uploadResponse = response;
                    if(this.uploadResponse?.error=='NO'){

                      var dConfirm = this._dialog.open(CustomModalComponent,
                            { width: '450px',
                              data: {
                              mensaje: "Documento cargado con exito!",
                              tipoMensaje: TipoMensajeEnum.success
                            }
                          });
                        dConfirm.afterClosed().subscribe(result => {
                              this.listDocumento();
                              this.limpiarFormulario();
                          
                            });
                    }
                    else{
                      this.disableSave=false;
                      var dConfirm = this._dialog.open(CustomModalComponent,
                            { width: '450px',
                              data: {
                              mensaje: this.uploadResponse?.errorDetail,
                              tipoMensaje: TipoMensajeEnum.wrong
                            }
                          });
                    }
                  });
             }
             else{
              this.disableSave=false;
             }
        });
        
  }

  limpiarFormulario(){
    this.documentoForm.controls['tipoDocumento'].setValue(
      this.nonSelectedOptionValue
    );
    this.documentoForm.controls['archivo'].setValue(
      this.nonSelectedOptionValue
    );
    this.selectedFile = null;
    this.disableSave=false;
  }

  deshabilitarFormulario() {
    Object.keys(this.documentoForm.controls).forEach(controlName => {
      this.documentoForm.controls[controlName].disable();
    });
    this.disableSave=true;
  }
}
