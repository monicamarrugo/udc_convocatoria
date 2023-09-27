import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import {InscripcionMinimos} from '../../model/dtos/inscripcion-minimos';
import { MatTableDataSource } from '@angular/material/table';
import { InscripcionService} from '../../services/inscripcion.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { RespuestaTransaccion } from '../../model/dtos/respuesta-transaccion';
import {CustomModalComponent,TipoMensajeEnum} from 'src/app/widgets/custom-modal/custom-modal.component';

@Component({
  selector: 'app-check-requisitos',
  templateUrl: './check-requisitos.component.html',
  styleUrls: ['./check-requisitos.component.css']
})
export class CheckRequisitosComponent implements OnInit {

  public dataSource: MatTableDataSource<InscripcionMinimos>;
  public inscripcion:string;
  public displayedColumns: string[] = [
    'nombreTipoDocumento',
    'cumplido',
    'observacion'
    
   ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CheckRequisitosComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private inscripcionService : InscripcionService,
    public _dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource<InscripcionMinimos>([]);
    this.inscripcion = data.codigoInscripcion

    if(data.codigoInscripcion){
      this.inscripcionService.getInscripcionMinimos(data.codigoInscripcion)
      .subscribe({
        next: (inscripciones: InscripcionMinimos[]) => {     
          if (inscripciones.length > 0) {
            this.dataSource.data = inscripciones;
          } else {
            this.dataSource.data = [];
          }
        }
    });
  }
  }

  ngOnInit(): void { }

  cumplido(row: any, slide: MatSlideToggle) {
    row.cumplido = row.cumplido === false ? true : false;
    let dtoMinimo: InscripcionMinimos = new InscripcionMinimos({});
    dtoMinimo.codigoInscripcion = this.inscripcion;
    dtoMinimo.codigoTipoDocumento = row.codigoTipoDocumento;
    dtoMinimo.cumplido = row.cumplido;
    dtoMinimo.no_cumplido = false;
    dtoMinimo.observacion = row.observacion;
    
   
  }

  noCumplido(row: any, slide: MatSlideToggle) {
    row.no_cumplido = row.no_cumplido === false ? true : false;
    let dtoMinimo: InscripcionMinimos = new InscripcionMinimos({});
    dtoMinimo.codigoInscripcion = this.inscripcion;
    dtoMinimo.codigoTipoDocumento = row.codigoTipoDocumento;
    dtoMinimo.no_cumplido = row.no_cumplido;
    dtoMinimo.cumplido = false;
    dtoMinimo.observacion = row.observacion;
    
    
  }

  save(){
    this.inscripcionService
    .saveDocMinimo(this.dataSource.data)
    .subscribe((result:RespuestaTransaccion)=>{

          if(result.error=='NO'){
            var dConfirm = this._dialog.open(CustomModalComponent,
                  { width: '450px',
                    data: {
                    mensaje: result.mensaje,
                    tipoMensaje: TipoMensajeEnum.success
                  }
                }); 
          }else{
            var dConfirm = this._dialog.open(CustomModalComponent,
                  { width: '450px',
                    data: {
                    mensaje: result.errorDetail,
                    tipoMensaje: TipoMensajeEnum.wrong
                  }
                }); 
          }
    }
    );
  }

  close() {
    this.dialogRef.close();
  }
}
