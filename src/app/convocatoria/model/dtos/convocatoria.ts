export class Convocatoria{

    codigo : string;
    nombre: string;
    activo: boolean;
    fechaInicio : string;
    fechaFin : string;
    
    constructor(_parameters: any) {
           this.codigo = (_parameters?.codigo != null ? _parameters.codigo : undefined);
           this.nombre = (_parameters?.nombre != null ? _parameters.nombre : undefined);
           this.activo = (_parameters?.activo != null ? _parameters.activo : undefined);
           this.fechaInicio = (_parameters?.fechaInicio != null ? _parameters.fechaInicio : undefined);
           this.fechaFin = (_parameters?.fechaFin != null ? _parameters.fechaFin : undefined);
    }

}