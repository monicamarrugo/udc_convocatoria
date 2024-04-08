export class EvaluacionDto{

    cabeceraEvaluacion : EvaluacionCompetencia;
    detalleEvaluacion: DetalleEvaluacion[];
    competencias: Competencias[];
    
    
    constructor(_parameters: any) {
           this.cabeceraEvaluacion = (_parameters?.cabeceraEvaluacion != null ? _parameters.cabeceraEvaluacion : undefined);
           this.detalleEvaluacion = (_parameters?.detalleEvaluacion != null ? _parameters.detalleEvaluacion : undefined);
           this.competencias = (_parameters?.competencias != null ? _parameters.competencias : undefined);
    }

}

export class EvaluacionCompetencia{

    idEvaluacion : number|null;
    codigoInscripicion: string;
    identificacionEvaluador: string;
    nombreEvaluador : string;
    totalEvaluacion : number;
    observacion : string;
    codigoPerfil: string;
    fechaEvaluacion: string;
    
    constructor(_parameters: any) {
           this.idEvaluacion = (_parameters?.idEvaluacion != null ? _parameters.idEvaluacion : undefined);
           this.codigoInscripicion = (_parameters?.codigoInscripicion != null ? _parameters.codigoInscripicion : undefined);
           this.identificacionEvaluador = (_parameters?.identificacionEvaluador != null ? _parameters.identificacionEvaluador : undefined);
           this.nombreEvaluador = (_parameters?.nombreEvaluador != null ? _parameters.nombreEvaluador : undefined);
           this.totalEvaluacion = (_parameters?.totalEvaluacion != null ? _parameters.totalEvaluacion : undefined);
           this.observacion = (_parameters?.observacion != null ? _parameters.observacion : undefined);
           this.codigoPerfil = (_parameters?.codigoPerfil != null ? _parameters.codigoPerfil : undefined);
           this.fechaEvaluacion = (_parameters?.fechaEvaluacion != null ? _parameters.fechaEvaluacion : undefined);
    }

}

export class DetalleEvaluacion{

    idDetalle : number|null;
    idEvaluacion: number|null;
    idCompetencia: number;
    calificacionObtenida : number;
    calificacionPonderada : number;
    
    constructor(_parameters: any) {
           this.idDetalle = (_parameters?.idDetalle != null ? _parameters.idDetalle : undefined);
           this.idEvaluacion = (_parameters?.idEvaluacion != null ? _parameters.idEvaluacion : undefined);
           this.idCompetencia = (_parameters?.idCompetencia != null ? _parameters.idCompetencia : undefined);
           this.calificacionObtenida = (_parameters?.calificacionObtenida != null ? _parameters.calificacionObtenida : undefined);
           this.calificacionPonderada = (_parameters?.calificacionPonderada != null ? _parameters.calificacionPonderada : undefined);
           
    }

}

export class Competencias{

    idCompetencia : number;
    descripcion: string;
    tipo: string;
    inferior : number;
    medio : number;
    superior : number;
    peso : number;
    calificacionObtenida : number;
    calificacionPonderada : number;
    calificacionPromediada : number;
    
    constructor(_parameters: any) {
           this.idCompetencia = (_parameters?.idCompetencia != null ? _parameters.idCompetencia : undefined);
           this.descripcion = (_parameters?.descripcion != null ? _parameters.descripcion : undefined);
           this.tipo = (_parameters?.tipo != null ? _parameters.tipo : undefined);
           this.inferior = (_parameters?.inferior != null ? _parameters.inferior : undefined);
           this.medio = (_parameters?.medio != null ? _parameters.medio : undefined);
           this.superior = (_parameters?.superior != null ? _parameters.superior : undefined);
           this.peso = (_parameters?.peso != null ? _parameters.peso : undefined);
           this.calificacionObtenida = (_parameters?.calificacionObtenida != null ? _parameters.calificacionObtenida : undefined);
           this.calificacionPonderada = (_parameters?.calificacionPonderada != null ? _parameters.calificacionPonderada : undefined);
           this.calificacionPromediada = (_parameters?.calificacionPromediada != null ? _parameters.calificacionPromediada : undefined);
           
    }

}