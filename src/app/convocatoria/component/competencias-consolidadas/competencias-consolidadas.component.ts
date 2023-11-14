import { Component, Input } from '@angular/core';
import { Competencias, DetalleEvaluacion, EvaluacionCompetencia, EvaluacionDto } from '../../model/dtos/evaluacion-competencia';
import { MatTableDataSource } from '@angular/material/table';
import { ConvocatoriaService } from '../../services/convocatoria.service';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../../services/storage.service';
import { CustomModalComponent, TipoMensajeEnum } from 'src/app/widgets/custom-modal/custom-modal.component';
import { RespuestaTransaccion } from '../../model/dtos/respuesta-transaccion';

@Component({
  selector: 'app-competencias-consolidadas',
  templateUrl: './competencias-consolidadas.component.html',
  styleUrls: ['./competencias-consolidadas.component.css']
})
export class CompetenciasConsolidadasComponent {
  _parameters: any;
  nombre:string="Sistemas";
  identificacion:string="Sistemas";
 codigoinscripcion:string="";
 calificacionTotal:number|null = null;
 identificacionEvaluador:string|undefined = undefined;
 nombreEvaluador:string|undefined = undefined;
 deshabilitado:boolean= false;
 observacion: string= "";
 escala = [
   { valor: 40, texto: '40' },
   { valor: 70, texto: '70' },
   { valor: 100, texto: '100' }
 ];
 public displayedColumns: string[] = [
   'idCompetencia',
   'descripcion',
   'calificacionPromediada' 
  ];
  admitido:boolean = true;
  marcaAdmitido:boolean = false;
  textoAdmitido:string='';
  mostrarRadio:boolean = true;
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
   .geListarPromediados(this.codigoinscripcion)
   .subscribe((result)=>{
 
       if(result){
         this.dataSource.data = result.competencias;
         this.calcularTotal();
       }
   });
 }
 
 calcularTotal(){
   let cont :number = 0;
    let sum: number = 0;
   this.dataSource.data.forEach(c => {
     sum += c.calificacionPromediada;
         
   });
     this.calificacionTotal = sum;
      
 }
 
 calcularPonderado(event: any, competencia:Competencias){
   this.dataSource.data.forEach(c => {
     if(c.idCompetencia === competencia.idCompetencia){
       c.calificacionPonderada = (Number(event.value) * competencia.peso) / 100;
     }
   });
 }
 
 guardarEvaluacion(){
   
   if(this.validarCampos()){
    const dtoEvaluacion = {
      codigo_inscripcion: this.codigoinscripcion,
      total_ponderado: this.calificacionTotal,
      elegible: this.admitido
    }
 
       console.log(dtoEvaluacion);
 
       this.convocatoriaService
           .saveConsolidadoCompetencia(dtoEvaluacion)
           .subscribe((result:RespuestaTransaccion)=>{
     
             if(result.error=='NO'){
                   this.deshabilitado = true;
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

  if(!this.marcaAdmitido){
    var dConfirm = this._dialog.open(CustomModalComponent,
          { width: '450px',
            data: {
            mensaje: "No ha especificado la casilla ELEGIBLE!",
            tipoMensaje: TipoMensajeEnum.warning
          }
        });
      return false;
  }
   return true;
  
 }

 admitir(event:any){
  this.marcaAdmitido = true;
  if(event == 1){
    this.admitido = true;
    this.textoAdmitido ='SI'
  }else{
    this.admitido = false;
    this.textoAdmitido ='NO'
  }
}


 
}
