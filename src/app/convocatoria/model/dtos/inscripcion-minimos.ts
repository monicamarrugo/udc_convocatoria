export class InscripcionMinimos{

    public codigoInscripcion: string;
    public codigoTipoDocumento: string;
    public nombreTipoDocumento: string;
    public cumplido: boolean;
    public no_cumplido: boolean;
    public fecha_cumplido: string; 
    public observacion: string;

    constructor(_parameters: any) {
            this.codigoInscripcion = (_parameters?.codigoInscripcion != null ? _parameters.codigoInscripcion : undefined);
            this.codigoTipoDocumento = (_parameters?.codigoTipoDocumento != null ? _parameters.codigoTipoDocumento : undefined);
            this.nombreTipoDocumento = (_parameters?.nombreTipoDocumento != null ? _parameters.nombreTipoDocumento : undefined);
            this.cumplido = (_parameters?.cumplido != null ? _parameters.cumplido : undefined);
            this.no_cumplido = (_parameters?.no_cumplido != null ? _parameters.no_cumplido : undefined);
            this.fecha_cumplido = (_parameters?.fecha_cumplido != null ? _parameters.fecha_cumplido : undefined);
            this.observacion = (_parameters?.observacion != null ? _parameters.observacion : undefined);
    }
}