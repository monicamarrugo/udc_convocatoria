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
import { Item, SubtipoDocumento } from 'src/app/convocatoria/model/item';
import { ListasService} from '../../services/listas.service';
import { Convocatoria } from '../../model/dtos/convocatoria';
import { ConvocatoriaService } from '../../services/convocatoria.service';
import { MatSelectChange } from '@angular/material/select';
import { UploadFileDialogComponent } from '../upload-file-dialog/upload-file-dialog.component';

@Component({
  selector: 'app-archivos-participante',
  templateUrl: './archivos-participante.component.html',
  styleUrls: ['./archivos-participante.component.css']
})
export class ArchivosParticipanteComponent  implements OnInit {

  selectedFile: File | null = null;
  selectedFileUpdate: File | null = null;
  uploadResponse: RespuestaTransaccion | null = null;
  public documentoForm: FormGroup;
  public nonSelectedOptionValue: string = '';
  public dataSource: MatTableDataSource<ResponseDocumento>;
  public codigoConvocatoria:string='';
  public lTiposDocumento: Item[] = [];
  public lSubtiposDocumento: SubtipoDocumento[] = [];
  public selectedTipoDoc: Item | null = null;
  public lDocumentosSubidos: Item[] = [];
  public displayedColumns: string[] = [
    'contenido',
    'descTipodocumento',
    'nombreSubtipoDocumento',
    'acciones'
   ];
   groupColumns = ['tipoDocumento'];
   dataColumns = ['contenido', 'descTipodocumento'];
   disableSave:boolean=false;
   disableEdit:boolean=true;
   conovocatorias: Convocatoria[] = [{codigo: '1', nombre: 'Convocatoria 02046', fechaInicio:'', fechaFin:'', activo: true}];
   public selectedConvocatoria:string='1';
   codigoEnMayusculas: string = '';
   private collator = new Intl.Collator('es', { sensitivity: 'base', numeric: true });
   

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
      subtipoDocumento:[''],
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
  onFileSelectedUpdate(event: any) {
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
          this.selectedFileUpdate = null;
      
        });
    }
    if (selectedFile && selectedFile.type === 'application/pdf'){
      this.selectedFileUpdate = event.target.files[0];
      this.disableEdit = false;
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
          this.selectedFileUpdate = null;
      
        });
    }
  }
  listDocumento(){
    this.disableEdit = true;
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
 actualizarDocumento(row: any){
  console.log("actualizar");
  if (!this.selectedFileUpdate) return;
   const formData = new FormData();
    formData.append('file', this.selectedFileUpdate);
    formData.append('idDocumento', row.idDocumento);
    formData.append('codigoInscripcion', this.documentoForm.controls["codigoInscripcion"].value.toUpperCase());
    formData.append('tipoDocumento', (row.tipoDocumento));
    formData.append('subtipoDocumento', (row.subtipoDocumento));

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
                               this.selectedFileUpdate = null;
                                this.disableEdit=true;
                          
                            });
                    }
                    else{
                      this.disableEdit=false;
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
        });
  
 }
  elminarDocumento(row: any){
  
   const formData = new FormData();
    formData.append('idDocumento', row.idDocumento);
    formData.append('codigoInscripcion', this.documentoForm.controls["codigoInscripcion"].value.toUpperCase());
    formData.append('tipoDocumento', (row.tipoDocumento));
    formData.append('subtipoDocumento', (row.subtipoDocumento));

  const dialogRef = this._dialog.open(ConfirmacionComponent, {
                  width: '95%',
                  maxHeight: '95vh',
                  disableClose: true,
                  data: {
                    titulo: "Eliminar Documento",
                    mensaje: "¿Está seguro de eliminar el documento?"
                  }
        });

         dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response && response == true) {
                this.documentoService.eliminarDocumento(formData)
                  .subscribe(response => {
                    this.uploadResponse = response;
                    if(this.uploadResponse?.error=='NO'){

                      var dConfirm = this._dialog.open(CustomModalComponent,
                            { width: '450px',
                              data: {
                              mensaje: "Documento eliminado con exito!",
                              tipoMensaje: TipoMensajeEnum.success
                            }
                          });
                        dConfirm.afterClosed().subscribe(result => {
                              this.listDocumento();
                          
                            });
                    }
                    else{
                      this.disableEdit=false;
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
    formData.append('tipoDocumento', (this.documentoForm.controls["tipoDocumento"].value).codigo);
    formData.append('subtipoDocumento', (this.documentoForm.controls["subtipoDocumento"].value) == null? null:(this.documentoForm.controls["subtipoDocumento"].value).codigo);

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
    this.documentoForm.controls['subtipoDocumento'].setValue(
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

  onChangeTipoDocumento(event: MatSelectChange) {
    const tipoSeleccionado = event.value as Item | null;

  this.selectedTipoDoc = tipoSeleccionado;

  this.lSubtiposDocumento = [...(tipoSeleccionado?.subtipos ?? [])]
    .sort((a, b) => this.collator.compare((a.nombre ?? '').trim(), (b.nombre ?? '').trim()));

  // resetear el control de subtipo si ya tenía uno
  this.documentoForm.get('subtipoDocumento')?.reset();

  }

  openUploadDialog(row: any) {
  const codigo = this.documentoForm.controls["codigoInscripcion"]?.value?.toUpperCase?.() ?? '';

  const ref = this._dialog.open(UploadFileDialogComponent, {
    width: '520px',
    data: { row, codigoInscripcion: codigo }
  });

  ref.afterClosed().subscribe((res?: { uploaded: boolean }) => {
    if (res?.uploaded) {
      this.listDocumento(); // refresca la tabla
    }
  });
}
}
