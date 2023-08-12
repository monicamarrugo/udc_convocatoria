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
  public displayedColumns: string[] = [
    'contenido',
    'descTipodocumento'
   ];
   groupColumns = ['tipoDocumento'];
   dataColumns = ['contenido', 'descTipodocumento'];
  constructor(
    private documentoService: DocumentosService,
    private formBuilder: FormBuilder,
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
        } else {
          this.dataSource.data = [];
          
        }
      }

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
