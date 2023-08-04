export class RespuestaTransaccion{

    public error: string|undefined;
    public errorDetail: string|undefined;
    public mensaje: string|undefined;
    public respuesta: string|undefined;

    constructor(_parameters: any) {
            this.error = (_parameters?.error != null ? _parameters.error : undefined);
            this.errorDetail = (_parameters?.errorDetail != null ? _parameters.errorDetail : undefined);
            this.mensaje = (_parameters?.mensaje != null ? _parameters.mensaje : undefined);
            this.respuesta = (_parameters?.respuesta != null ? _parameters.respuesta : undefined);
    }



}