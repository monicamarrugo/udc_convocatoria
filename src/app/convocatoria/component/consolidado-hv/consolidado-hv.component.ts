import { Component, Input } from '@angular/core';
import { ConsolidadoHV } from '../../model/dtos/consolidado-hv';
import { MatTableDataSource } from '@angular/material/table';
import { ConvocatoriaService } from '../../services/convocatoria.service';

@Component({
  selector: 'app-consolidado-hv',
  templateUrl: './consolidado-hv.component.html',
  styleUrls: ['./consolidado-hv.component.css']
})
export class ConsolidadoHvComponent {

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
  public dataSource: MatTableDataSource<ConsolidadoHV>;
  public displayedColumns: string[] = [
    'codigoperfil',
    'codigoinscripcion',
    'totalFormacion',
    'totalFormacionIn',
    'totalProduccion',
    'totalExperiencia',
    'totalEvaluacion',
    'admitido'    
   ];
  constructor
  (private convocatoriaService: ConvocatoriaService)
  {
    this.dataSource = new MatTableDataSource<ConsolidadoHV>([]);
  }
  cargarConsolidado(){
    
    this.convocatoriaService
    .getConsolidadoVerificacionHojaVida(this._listaPerfiles)
    .subscribe({
            next: (data) => { 
              this.dataSource = data;
                },
            error: (error) => {
            },
              });
  }

}
