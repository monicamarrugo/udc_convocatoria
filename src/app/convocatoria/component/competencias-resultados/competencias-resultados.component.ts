import { Component, Input } from '@angular/core';
import { EvaluacionDto } from '../../model/dtos/evaluacion-competencia';
import { MatTableDataSource } from '@angular/material/table';
import { ConvocatoriaService } from '../../services/convocatoria.service';

@Component({
  selector: 'app-competencias-resultados',
  templateUrl: './competencias-resultados.component.html',
  styleUrls: ['./competencias-resultados.component.css']
})
export class CompetenciasResultadosComponent {
  _listaPerfiles: string[] = [];
  @Input()
  get listaPerfiles(): string[] {
    return this.listaPerfiles;
  }
  set listaPerfiles(listaPerfiles: string[]) {
    this._listaPerfiles = listaPerfiles;

    if(listaPerfiles.length > 0){
      this.cargarConsolidado();
    }
  }
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[] = [
    'codigoPerfil',
    'codigo_inscripcion',
    'total_ponderado',
    'elegible',   
   ];
  constructor
  (private convocatoriaService: ConvocatoriaService)
  {
    this.dataSource = new MatTableDataSource<any>([]);
  }
  cargarConsolidado(){
    
    this.convocatoriaService
    .getConsolidadoCompetencias(this._listaPerfiles)
    .subscribe({
            next: (data) => { 
              this.dataSource = data;
                },
            error: (error) => {
            },
              });
  }

}
