import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { ListasService } from '../../services/listas.service';
import { FacultadPerfil } from '../../model/facultad-perfil';
import { Inscripcion } from '../../model/dtos/inscripcion';
import { MatTableDataSource } from '@angular/material/table';
import { InscripcionService } from '../../services/inscripcion.service';

@Component({
  selector: 'app-evaluacion-competencias',
  templateUrl: './evaluacion-competencias.component.html',
  styleUrls: ['./evaluacion-competencias.component.css']
})
export class EvaluacionCompetenciasComponent {

  public evaluacionForm: FormGroup;
  public selectedPerfil:any = null;
  public nonSelectedOptionValue: string = '';
  public lPerfiles: FacultadPerfil[] = [];
  public mostrarResultados: boolean= false;
  public mostrarNoResultados: boolean = false;
  public totalInscripciones: number  = 100;
  public dataSource: MatTableDataSource<Inscripcion>;
  parameters!: any | undefined;
  parametersPro!: any | undefined;
  public displayedColumns: string[] = [
    'nombres',
    'apellidos',
    'codigoInscripcion',
    'acciones'
   ];
   listaPerfiles!: string[] |undefined;
  constructor(private formBuilder: FormBuilder,
    private storageService: StorageService,
    private listaService: ListasService,
    private inscripcionService : InscripcionService,){

      this.mostrarResultados = false;
      this.mostrarNoResultados = false;
      this.dataSource = new MatTableDataSource<Inscripcion>([]);
    this.evaluacionForm = this.formBuilder.group({
      idComision: ['', Validators.required],
      codigoPerfil: ['', Validators.required]
     });
     this.getPerfiles();
  }

  buscarEvaluacionHV(event: any){
  
    if(this.selectedPerfil){
      this.parameters = undefined;
     // this.listaPerfiles = undefined;
  
      this.inscripcionService.getAdmitidosHV(this.selectedPerfil)
      .subscribe({
        next: (inscripciones: Inscripcion[]) => {     
          if (inscripciones.length > 0) {
            this.mostrarResultados = true;
            this.mostrarNoResultados = false;
            this.totalInscripciones = inscripciones.length;
            this.dataSource.data = inscripciones;
          } else {
            this.mostrarResultados = false;
            this.mostrarNoResultados = true;
            this.dataSource.data = [];
          }
        }
    });
  }
  
  }

  private getPerfiles(){
    let comision = this.storageService.loadSessionData();
    this.evaluacionForm.controls['codigoPerfil'].setValue(
      this.nonSelectedOptionValue
    );
    this.listaService
      .getPerfilesComision(comision?.id!)
      .subscribe({
              next: (data) => { 
                this.lPerfiles = data;
                  },
              error: (error) => {
              },
                });
  }

  verVerificador(row: any) {
    const participante: any = {
      codigoInscripcion: row.codigoInscripcion,
      nombre: row.nombres +" "+ row.apellidos
    };
    this.mostrarResultados =false;
    this.listaPerfiles = undefined;
    this.parameters = participante;
  }

  verVerificadorPromedio(row: any) {
    const participante: any = {
      codigoInscripcion: row.codigoInscripcion,
      nombre: row.nombres +" "+ row.apellidos
    };
    this.mostrarResultados =false;
    this.listaPerfiles = undefined;
    this.parametersPro = participante;
  }

  volver(){
    this.parameters = undefined;
    this.parametersPro = undefined;
    this.mostrarResultados =true;
  }
  logout() {
    this.storageService.logout();
  }
}
