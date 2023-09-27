import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import {InscripcionMinimos} from '../../model/dtos/inscripcion-minimos';
import { MatTableDataSource } from '@angular/material/table';
import { InscripcionService} from '../../services/inscripcion.service';
import { ActivatedRoute } from '@angular/router';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { RespuestaTransaccion } from '../../model/dtos/respuesta-transaccion';
import {CustomModalComponent,TipoMensajeEnum} from 'src/app/widgets/custom-modal/custom-modal.component';
import {Inscripcion} from '../../model/dtos/inscripcion';

@Component({
  selector: 'app-pantalla-acta',
  templateUrl: './pantalla-acta.component.html',
  styleUrls: ['./pantalla-acta.component.css']
})
export class PantallaActaComponent implements OnInit {
  public dataSource: MatTableDataSource<InscripcionMinimos>;
  public inscripcion:string;
  public participante: string;
  public identificacion: string;
  public displayedColumns: string[] = [
    'nombreTipoDocumento',
    'cumplido',
    'observacion'
    
   ];

  constructor(
    private fb: FormBuilder,
    
    private inscripcionService : InscripcionService,
    private route: ActivatedRoute, 
  ) {
    this.dataSource = new MatTableDataSource<InscripcionMinimos>([]);
    this.inscripcion = this.route.snapshot.paramMap.get('codigoInscripicion')!;
    //this.inscripcion = data.codigoInscripcion;
    //this.participante = data.nombreParticipante;
    this.participante = "";
    this.identificacion = "";

    if(this.inscripcion){

      this.inscripcionService.getInscripcionById(this.inscripcion)
      .subscribe({
        next: (inscripcion: Inscripcion) => {     
          if (inscripcion) {
            this.participante = inscripcion.nombres + " " + inscripcion.apellidos;
            this.identificacion = inscripcion.identificacion;

            this.inscripcionService.getInscripcionMinimos(this.inscripcion)
            .subscribe({
              next: (inscripciones: InscripcionMinimos[]) => {     
                if (inscripciones.length > 0) {
                  this.dataSource.data = inscripciones;
                } else {
                  this.dataSource.data = [];
                }
              }
          });

          } else {
            this.dataSource.data = [];
          }
        }
    });

    
  }
  }

  ngOnInit(): void { }



  imprimirPagina() {
    window.print();
  }

  close() {
    //this.dialogRef.close();
  }
}
