import { Component, Input } from '@angular/core';
import { ConvocatoriaService } from '../../services/convocatoria.service';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../../services/storage.service';
import { InscripcionService } from '../../services/inscripcion.service';
import { RespuestaTransaccion } from '../../model/dtos/respuesta-transaccion';
import { CustomModalComponent, TipoMensajeEnum } from 'src/app/widgets/custom-modal/custom-modal.component';

@Component({
  selector: 'app-hoja-vida',
  templateUrl: './hoja-vida.component.html',
  styleUrls: ['./hoja-vida.component.css']
})
export class HojaVidaComponent {

  formacion1:number = 0;
  formacion2:number = 0;
  formacion3:number = 0;
  formacion4:number = 0;
  totalFormacion:number =0;

  fomacionIn1:number = 0;
  fomacionIn2:number = 0;
  totalFormacionIn:number = 0;

  produccion1:number = 0;
  produccion2:number = 0;
  produccion3:number = 0;
  produccion4:number = 0;
  produccion5:number = 0;
  produccion6:number = 0;
  produccion7:number = 0;
  produccion8:number = 0;
  produccion9:number = 0;
  produccion10:number = 0;
  produccion11:number = 0;
  produccion12:number = 0;
  totalProduccion:number = 0;

  experiencia1:number = 0;
  experiencia2:number = 0;
  experiencia3:number = 0;
  experiencia4:number = 0;
  totalExperiencia:number=0;

  totalEvaluacion:number=0;

  observacion1:string = "";
  observacion2:string = "";
  observacion3:string = "";
  observacion4:string = "";
  observacion5:string = "";
  observacion6:string = "";
  observacion7:string = "";
  observacion8:string = "";
  observacion9:string = "";
  observacion10:string = "";
  observacion11:string = "";
  observacion12:string = "";
  observacion13:string = "";
  observacion14:string = "";
  observacion15:string = "";
  observacion16:string = "";
  observacion17:string = "";
  observacion18:string = "";
  observacion19:string = "";
  observacion20:string = "";
  observacion21:string = "";
  observacion22:string = "";
  observacionGeneral:string = "";

  admitido:boolean = true;
  marcaAdmitido:boolean = false;

  facultad:string|undefined="Sistemas";
  programa:string="Sistemas";
  nombre:string="Sistemas";
  identificacion:string="Sistemas";
  codigoinscripcion:string="";
  calculosActivos: any[] = [];
  _parameters: any;
  calculoPostgrado: boolean = false;
  calculoDocencia: boolean = false;
  calculoProduccion: boolean = false;
  calculoExperiencia: boolean = false;
  calculoTotal: boolean = false;
  deshabilitado:boolean = false;
  textoAdmitido:string='';
  mostrarRadio:boolean = true;
  deshabilitadoPrint: boolean = true;

  @Input()
  get parameters(): any {
    return this.parameters;
  }
  set parameters(parameters: any) {
    this._parameters = parameters;

    if(parameters){
      this.nombre = parameters.nombre;
      this.identificacion = parameters.identificacion;
      this.codigoinscripcion = parameters.codigoInscripcion;
      this.cargarInfoVerificacion();
    }
  }

  constructor(
    private inscripcionService : InscripcionService,
    private convocatoriaService : ConvocatoriaService,
    public _dialog: MatDialog,
    private storageService: StorageService
    ){
      let sesion = this.storageService.loadSessionData();
      this.facultad = sesion?.facultad;
      
      
  }
  cargarInfoVerificacion(){
    this.convocatoriaService
    .getVerificacionHojaVida(this.codigoinscripcion)
    .subscribe((result)=>{

        if(result){
          this.deshabilitadoPrint = false;
          this.modificarCampos(result);
        }
    });
  }
  modificarCampos(datos:any){
    this.codigoinscripcion= datos.codigoinscripcion,
    this.formacion1 = datos.formacion1,
    this.formacion2=datos.formacion2,
    this.formacion3=datos.formacion3,
    this.formacion4=datos.formacion4,
    this.totalFormacion=datos.totalFormacion,

    this.fomacionIn1=datos.fomacionIn1,
    this.fomacionIn2=datos.fomacionIn2,
    this.totalFormacionIn=datos.totalFormacionIn,

    this.produccion1=datos.produccion1,
    this.produccion2=datos.produccion2,
    this.produccion3=datos.produccion3,
    this.produccion4=datos.produccion4,
    this.produccion5=datos.produccion5,
    this.produccion6=datos.produccion6,
    this.produccion7=datos.produccion7,
    this.produccion8=datos.produccion8,
    this.produccion9=datos.produccion9,
    this.produccion10=datos.produccion10,
    this.produccion11=datos.produccion11,
    this.produccion12=datos.produccion12,
    this.totalProduccion=datos.totalProduccion,

    this.experiencia1=datos.experiencia1,
    this.experiencia2=datos.experiencia2,
    this.experiencia3=datos.experiencia3,
    this.experiencia4=datos.experiencia4,
    this.totalExperiencia=datos.totalExperiencia,

    this.totalEvaluacion=datos.totalEvaluacion,

    this.observacion1=datos.observacion1,
    this.observacion2=datos.observacion2,
    this.observacion3=datos.observacion3,
    this.observacion4=datos.observacion4,
    this.observacion5=datos.observacion5,
    this.observacion6=datos.observacion6,
    this.observacion7=datos.observacion7,
    this.observacion8=datos.observacion8,
    this.observacion9=datos.observacion9,
    this.observacion10=datos.observacion10,
    this.observacion11=datos.observacion11,
    this.observacion12=datos.observacion12,
    this.observacion13=datos.observacion13,
    this.observacion14=datos.observacion14,
    this.observacion15=datos.observacion15,
    this.observacion16=datos.observacion16,
    this.observacion17=datos.observacion17,
    this.observacion18=datos.observacion18,
    this.observacion19=datos.observacion19,
    this.observacion20=datos.observacion20,
    this.observacion21=datos.observacion21,
    this.observacion22=datos.observacion22,
    this.observacionGeneral=datos.observacionGeneral,

    this.admitido = datos.admitido
    if(this.admitido){
      this.textoAdmitido = "SI"
    }else{
      this.textoAdmitido = "NO"
    }
    this.mostrarRadio = true;
    this.deshabilitado = false;
  }

  calcularFormacion() {
    let total:number = 0;
    total =  total + Number(this.formacion1) +  Number(this.formacion2) +  Number(this.formacion3) +  Number(this.formacion4);
    if(total > 40){
      this.totalFormacion = 40;
    }   
    else{
      this.totalFormacion = total;
    }
    this.calculoPostgrado= true;
  }

  calcularFormacionIn(){
    let total:number = 0;
    total =  total + Number(this.fomacionIn1) +  Number(this.fomacionIn2);

    if(total > 10){
      this.totalFormacionIn = 10;
    }   
    else{
      this.totalFormacionIn = total;
    }
    this.calculoDocencia = true;
  }

  calcularProduccion(){
    let total:number = 0;
    console.log(this.produccion1);
    total =  total + Number(this.produccion1) +  Number(this.produccion2) +  Number(this.produccion3) +  Number(this.produccion4)
    +  Number(this.produccion5) +   Number(this.produccion6) +  Number(this.produccion7) +  Number(this.produccion8)
    +  Number(this.produccion9) +  Number(this.produccion10)+  Number(this.produccion11) +  Number(this.produccion12);
  
    if(total > 30){
      this.totalProduccion = 30;
    }   
    else{
      this.totalProduccion = total;
    }
    
    this.calculoProduccion = true;
    
  }

  calcularExperiencia(){
    let total:number = 0;

    total =  total + Number(this.experiencia1) +  Number(this.experiencia2) +  Number(this.experiencia3) +  Number(this.experiencia4);
  
    if(total > 20){
      this.totalExperiencia = 20;
    }   
    else{
      this.totalExperiencia = total;
    }
    this.calculoExperiencia= true;
  }

  calcularTotal(){
    let total:number = 0;

    total =  total + Number(this.totalFormacion) +  Number(this.totalFormacionIn) +  Number(this.totalProduccion) +  Number(this.totalExperiencia);
    this.totalEvaluacion = total;
    this.calculoTotal = true;
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
  validarCalculos(){
    if(!this.calculoPostgrado){
      var dConfirm = this._dialog.open(CustomModalComponent,
            { width: '450px',
              data: {
              mensaje: "No ha realizado el cálculo de FORMACIÓN POSTGRADUAL EN EL ÁREA DE LA CONVOCATORIA!",
              tipoMensaje: TipoMensajeEnum.warning
            }
          });
        return false;
    }
    if(!this.calculoDocencia){
      var dConfirm = this._dialog.open(CustomModalComponent,
            { width: '450px',
              data: {
              mensaje: "No ha realizado el cálculo de FORMACIÓN EN DOCENCIA UNIVERSITARIA E INGLÉS!",
              tipoMensaje: TipoMensajeEnum.warning
            }
          });
        return false;
    }
    if(!this.calculoProduccion){

      var dConfirm = this._dialog.open(CustomModalComponent,
            { width: '450px',
              data: {
              mensaje: "No ha realizado el cálculo de PRODUCCIÓN ACADÉMICA!",
              tipoMensaje: TipoMensajeEnum.warning
            }
          });
        return false;
    }
    if(!this.calculoExperiencia){
      var dConfirm = this._dialog.open(CustomModalComponent,
            { width: '450px',
              data: {
              mensaje: "No ha realizado el cálculo de EXPERIENCIA CALIFICADA!",
              tipoMensaje: TipoMensajeEnum.warning
            }
          });
        return false;
    }

    if(!this.calculoTotal){
      var dConfirm = this._dialog.open(CustomModalComponent,
            { width: '450px',
              data: {
              mensaje: "No ha realizado el cálculo Total!",
              tipoMensaje: TipoMensajeEnum.warning
            }
          });
        return false;
    }
    if(!this.marcaAdmitido){
      var dConfirm = this._dialog.open(CustomModalComponent,
            { width: '450px',
              data: {
              mensaje: "No ha especificado la casilla ADMITIDO!",
              tipoMensaje: TipoMensajeEnum.warning
            }
          });
        return false;
    }
    
    return true;
  }

  save(){
    if(this.validarCalculos()){
        const dto = {
          codigoinscripcion: this.codigoinscripcion,
          formacion1 : this.formacion1,
          formacion2:this.formacion2,
          formacion3:this.formacion3,
          formacion4:this.formacion4,
          totalFormacion:this.totalFormacion,

          fomacionIn1:this.fomacionIn1,
          fomacionIn2:this.fomacionIn2,
          totalFormacionIn:this.totalFormacionIn,

          produccion1:this.produccion1,
          produccion2:this.produccion2,
          produccion3:this.produccion3,
          produccion4:this.produccion4,
          produccion5:this.produccion5,
          produccion6:this.produccion6,
          produccion7:this.produccion7,
          produccion8:this.produccion8,
          produccion9:this.produccion9,
          produccion10:this.produccion10,
          produccion11:this.produccion11,
          produccion12:this.produccion12,
          totalProduccion:this.totalProduccion,

          experiencia1:this.experiencia1,
          experiencia2:this.experiencia2,
          experiencia3:this.experiencia3,
          experiencia4:this.experiencia4,
          totalExperiencia:this.totalExperiencia,

          totalEvaluacion:this.totalEvaluacion,

          observacion1:this.observacion1,
          observacion2:this.observacion2,
          observacion3:this.observacion3,
          observacion4:this.observacion4,
          observacion5:this.observacion5,
          observacion6:this.observacion6,
          observacion7:this.observacion7,
          observacion8:this.observacion8,
          observacion9:this.observacion9,
          observacion10:this.observacion10,
          observacion11:this.observacion11,
          observacion12:this.observacion12,
          observacion13:this.observacion13,
          observacion14:this.observacion14,
          observacion15:this.observacion15,
          observacion16:this.observacion16,
          observacion17:this.observacion17,
          observacion18:this.observacion18,
          observacion19:this.observacion19,
          observacion20:this.observacion20,
          observacion21:this.observacion21,
          observacion22:this.observacion22,
          observacionGeneral:this.observacionGeneral,

          admitido: this.admitido
        }
  
       
                        this.inscripcionService
                        .saveEvaluacionHv(dto)
                        .subscribe((result:RespuestaTransaccion)=>{
                  
                          if(result.error=='NO'){
                                this.deshabilitado = true;
                                this.deshabilitadoPrint = false;
                                var dConfirm = this._dialog.open(CustomModalComponent,
                                      { width: '450px',
                                        data: {
                                        mensaje: "Registro guardado con exito!",
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

  
}
