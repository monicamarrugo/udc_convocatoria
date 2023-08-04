export class Documento{

     tipoDocumento : string;
     codigoInscripcion: string;
     ruta: string;
     archivo: File;


     constructor(_parameters: any) {
            this.tipoDocumento = (_parameters?.tipoDocumento != null ? _parameters.tipoDocumento : undefined);
            this.codigoInscripcion = (_parameters?.codigoInscripcion != null ? _parameters.codigoInscripcion : undefined);
            this.ruta = (_parameters?.ruta != null ? _parameters.ruta : undefined);
            this.archivo = (_parameters?.archivo != null ? _parameters.archivo : undefined);
     }

}