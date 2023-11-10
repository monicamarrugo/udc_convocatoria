export class Inscripcion{

    public codigoConvocatoria: number;
    public codigoInscripcion: string;
    public codigoPerfil: string;
    public tipoIdentificacion: string;
    public identificacion: string; 
    public nombres: string;
    public apellidos: string;
    public email: string;
    public telefono: string;
    public evaluado: boolean;

    constructor(_parameters: any) {
            this.codigoConvocatoria = (_parameters?.codigoConvocatoria != null ? _parameters.codigoConvocatoria : undefined);
            this.codigoInscripcion = (_parameters?.codigoInscripcion != null ? _parameters.codigoInscripcion : undefined);
            this.codigoPerfil = (_parameters?.codigoPerfil != null ? _parameters.codigoPerfil : undefined);
            this.tipoIdentificacion = (_parameters?.tipoIdentificacion != null ? _parameters.tipoIdentificacion : undefined);
            this.identificacion = (_parameters?.identificacion != null ? _parameters.identificacion : undefined);
            this.nombres = (_parameters?.nombres != null ? _parameters.nombres : undefined);
            this.apellidos = (_parameters?.apellidos != null ? _parameters.apellidos : undefined);
            this.email = (_parameters?.email != null ? _parameters.email : undefined);
            this.telefono = (_parameters?.telefono != null ? _parameters.telefono : undefined);
            this.evaluado = (_parameters?.telefono != null ? _parameters.evaluado : undefined);

    }
}