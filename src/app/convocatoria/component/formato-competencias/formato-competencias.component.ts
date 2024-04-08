import { Component, Input } from '@angular/core';
import { ConvocatoriaService } from '../../services/convocatoria.service';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../../services/storage.service';
import { Competencias, DetalleEvaluacion, EvaluacionCompetencia, EvaluacionDto } from '../../model/dtos/evaluacion-competencia';
import { MatTableDataSource } from '@angular/material/table';
import { CustomModalComponent, TipoMensajeEnum } from 'src/app/widgets/custom-modal/custom-modal.component';
import { RespuestaTransaccion } from '../../model/dtos/respuesta-transaccion';

@Component({
  selector: 'app-formato-competencias',
  templateUrl: './formato-competencias.component.html',
  styleUrls: ['./formato-competencias.component.css']
})
export class FormatoCompetenciasComponent {
 _parameters: any;
 nombre:string="Sistemas";
 identificacion:string="Sistemas";
codigoinscripcion:string="";
calificacionTotal:number = 0;
identificacionEvaluador:string|undefined = undefined;
nombreEvaluador:string|undefined = undefined;
deshabilitado:boolean= false;
observacion: string= "";
codigoPerfil: string = "";
escala = [
  { valor: 40, texto: '40' },
  { valor: 70, texto: '70' },
  { valor: 100, texto: '100' }
];
public displayedColumns: string[] = [
  'idCompetencia',
  'descripcion',
  'inferior',
  'medio',
  'superior',
  'calificacionObtenida',
  'peso',
  'calificacionPonderada'  
 ];
 deshabilitadoPrint: boolean = true;
public dataSource: MatTableDataSource<Competencias>;

 @Input()
 get parameters(): any {
    return this.parameters;
 }
set parameters(parameters: any) {
  this._parameters = parameters;

  if(parameters){
    this.nombre = parameters.nombre;
    this.codigoinscripcion = parameters.codigoInscripcion;
    this.codigoPerfil = parameters.codigoPerfil;
    this.cargarEvaluacion();
  }
}

constructor(
  private convocatoriaService : ConvocatoriaService,
  public _dialog: MatDialog,
  private storageService: StorageService
  ){
    this.dataSource = new MatTableDataSource<Competencias>([]);
    
    
}

validarNumeros(event: any) {
  // Obtén el valor actual del input
  let inputValue: string = event.target.value;

  // Elimina caracteres que no sean números
  inputValue = inputValue.replace(/[^0-9]/g, '');

  // Actualiza el valor del input con solo números
  event.target.value = inputValue;
}

validarAlpha(event: any) {
  // Obtén el valor actual del input
  let inputValue: string = event.target.value;

  // Elimina caracteres que no sean números
  inputValue = inputValue.replace( /[^a-zA-Z0-9\s]/g, '');

  // Actualiza el valor del input con solo números
  event.target.value = inputValue;
}
cargarEvaluacion(){
  this.convocatoriaService
  .geListarCompetencias(this.codigoinscripcion)
  .subscribe((result)=>{

      if(result){
        this.dataSource.data = result.competencias;
      }
  });
}

calcularTotal(){
  let cont :number = 0;
   let sum: number = 0;
  this.dataSource.data.forEach(c => {
  
      sum += c.calificacionPonderada;
    
    
  });
    this.calificacionTotal = sum;
  
  
}

calcularPonderado(event: any, competencia:Competencias){
  this.dataSource.data.forEach(c => {
    if(c.idCompetencia === competencia.idCompetencia){
      c.calificacionPonderada = (Number(event.value) * competencia.peso) / 100;
    }
  });
  this.calcularTotal();
}

guardarEvaluacion(){
  
  if(this.validarCampos()){
      const cabecera = new EvaluacionCompetencia({});
      cabecera.idEvaluacion = null;
      cabecera.codigoInscripicion = this.codigoinscripcion;
      cabecera.identificacionEvaluador = this.identificacionEvaluador!;
      cabecera.nombreEvaluador = this.nombreEvaluador!;
      cabecera.observacion = this.observacion;
      cabecera.totalEvaluacion = Number(this.calificacionTotal);
      cabecera.codigoPerfil = this.codigoPerfil;

      let detalle: DetalleEvaluacion[] = [];
      let odetalle: DetalleEvaluacion;
      this.dataSource.data.forEach(c => {
        odetalle = new DetalleEvaluacion({})
        odetalle.idDetalle = null;
        odetalle.idEvaluacion = null;
        odetalle.idCompetencia = c.idCompetencia;
        odetalle.calificacionObtenida =  c.calificacionObtenida;
        odetalle.calificacionPonderada = c.calificacionPonderada;
        detalle.push(odetalle)
      });
      const dtoEvaluacion = new EvaluacionDto({});
      dtoEvaluacion.cabeceraEvaluacion = cabecera;
      dtoEvaluacion.detalleEvaluacion = detalle;

      console.log(dtoEvaluacion);

      this.convocatoriaService
          .saveEvaluacionCompetencia(dtoEvaluacion)
          .subscribe((result:RespuestaTransaccion)=>{
           
            if(result.error=='NO'){
                  this.deshabilitado = true;
                  this.deshabilitadoPrint = false;
                  var dConfirm = this._dialog.open(CustomModalComponent,
                        { width: '450px',
                          data: {
                          mensaje: result.mensaje,
                          tipoMensaje: TipoMensajeEnum.success
                        }
                      });  
    
                }else{
    
                  var dConfirmError = this._dialog.open(CustomModalComponent,
                        { width: '450px',
                          data: {
                            mensaje: "¡Atención!: \n "+ result.errorDetail,
                          tipoMensaje: TipoMensajeEnum.success
                        }
                      });  
    
              
                }
            });
}
}

validarCampos(){
  let cont :number = 0;
  this.dataSource.data.forEach(c => {
    if(c.calificacionPonderada === 0){
      cont+=1;
    }
  });
  if(cont > 0){
    var dConfirm = this._dialog.open(CustomModalComponent,
          { width: '450px',
            data: {
            mensaje: "Debe calificar todas las competencias!",
            tipoMensaje: TipoMensajeEnum.warning
          }
        });
      return false;
  }
  if(!this.identificacionEvaluador || !this.nombreEvaluador){
    var dConfirm = this._dialog.open(CustomModalComponent,
          { width: '450px',
            data: {
            mensaje: "Debe Completar la información del evaluador!",
            tipoMensaje: TipoMensajeEnum.warning
          }
        });
      return false;
  }
  if(!this.calificacionTotal){
    var dConfirm = this._dialog.open(CustomModalComponent,
          { width: '450px',
            data: {
            mensaje: "Debe calcular el total!",
            tipoMensaje: TipoMensajeEnum.warning
          }
        });
      return false;
  }
  return true;
 
}


}
