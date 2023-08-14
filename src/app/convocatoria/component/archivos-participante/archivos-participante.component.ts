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
import { Item } from 'src/app/convocatoria/model/item'
import { ListasService} from '../../services/listas.service'

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
  constructor(
    private documentoService: DocumentosService,
    private formBuilder: FormBuilder,
    private listaService: ListasService,
    public _dialog: MatDialog){
    
      this.dataSource = new MatTableDataSource<ResponseDocumento>([]);
    this.documentoForm = this.formBuilder.group({
      codigoInscripcion: ['', Validators.required],
      tipoDocumento:['', Validators.required],
      archivo:['', Validators.required],
      convocatoria:['', Validators.required]
     });

  }

  ngOnInit(): void {
    this.getTiposDocumento();
  }
 

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  listDocumento(){
    let codigo = this.documentoForm.controls["codigoInscripcion"].value;
    this.documentoService.listDocumento(codigo)
    .subscribe({
      next: (documentos: ResponseDocumento[]) => {     
        if (documentos.length > 0) {
          this.dataSource.data = documentos;
          this.verificarSubidos(documentos.slice());
        } else {
          this.dataSource.data = [];
          
        }
      }

    });
  }
  verificarSubidos(documentosSubidos:ResponseDocumento[]){
      
      this.lDocumentosSubidos = this.lTiposDocumento.slice();
      this.lDocumentosSubidos.find( d => {
        if(documentosSubidos.some(s => s.tipoDocumento === d.codigo)){
          d.subido=true;
        }
        else{
          d.subido=false;
        }
      });
      console.log(" this.lDocumentosSubidos");
      console.log(this.lDocumentosSubidos);
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
                   },
               error: (error) => {
               },
                 });
}

  saveDocumento() {
    if (!this.selectedFile) return;
    if(!this.documentoForm) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('codigoInscripcion', this.documentoForm.controls["codigoInscripcion"].value);
    formData.append('tipoDocumento', this.documentoForm.controls["tipoDocumento"].value);
    
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

  limpiarFormulario(){
    this.documentoForm.controls['tipoDocumento'].setValue(
      this.nonSelectedOptionValue
    );
    this.documentoForm.controls['archivo'].setValue(
      this.nonSelectedOptionValue
    );
    this.selectedFile = null;
  }
}
