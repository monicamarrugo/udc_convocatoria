import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { InscripcionService} from '../../services/inscripcion.service';
import { ActivatedRoute } from '@angular/router';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { RespuestaTransaccion } from '../../model/dtos/respuesta-transaccion';
import {CustomModalComponent,TipoMensajeEnum} from 'src/app/widgets/custom-modal/custom-modal.component';
import {Evaluado} from '../../model/dtos/evaluado';
import { ListasService} from '../../services/listas.service';
import { StorageService} from '../../services/storage.service';
import {Item} from '../../model/item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pantalla-acta',
  templateUrl: './pantalla-acta.component.html',
  styleUrls: ['./pantalla-acta.component.css']
})
export class PantallaActaComponent implements OnInit {
  public dataSource: MatTableDataSource<Evaluado>;
  public requisitosForm: FormGroup;
  public nonSelectedOptionValue: string = '';
  public selectedPerfil:any = null;
  public lPerfiles: Item[] = [];
  public mostrarResultados: boolean= false;
  public loading: boolean= false;
  
  public mostrarNoResultados: boolean = false;
  public totalInscripciones: number  = 0;
  public displayedColumns: string[] = [
    'codigoInscripcion',
    'did',
    'tpu',
    'tmd',
    'ced',
    'cci',
    'adm',
    'observacion'
   ];

  constructor(
    private formBuilder: FormBuilder,
    private inscripcionService : InscripcionService,
    private listaService: ListasService,
    private router: Router,
    private storageService: StorageService,
  ) {

    

    this.mostrarResultados = false;
    this.mostrarNoResultados = false;
    this.loading = false;
    this.dataSource = new MatTableDataSource<Evaluado>([]);
    this.requisitosForm = this.formBuilder.group({
      codigoPerfil: ['', Validators.required]
     });

     this.getPerfiles();
  }

  ngOnInit(): void { }

  private getPerfiles(){
    this.requisitosForm.controls['codigoPerfil'].setValue(
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

  buscarEvaluadosPerfil(event: any){
    this.loading= true;
    if(this.selectedPerfil){
      this.inscripcionService.getEvaluadosMinimos(this.selectedPerfil)
      .subscribe({
        next: (evaluaciones: Evaluado[]) => {     
          if (evaluaciones.length > 0) {
            this.loading= false;
            this.mostrarResultados = true;
            this.mostrarNoResultados = false;
            this.dataSource.data = evaluaciones;
            this.totalInscripciones = evaluaciones.length;
          } else {
            this.loading= false;
            this.mostrarResultados = false;
            this.mostrarNoResultados = true;
            this.dataSource.data = [];
          }
        }
    });       
}
  }
  imprimirPagina() {
    window.print();
  }

  logout() {
    this.storageService.logout();
  }
}
