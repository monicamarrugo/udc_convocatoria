export class Evaluado{

    public codigoInscripcion: string;
    public evaluado: boolean;
    public did: boolean;
    public tpu: boolean;
    public tmd: boolean;
    public ced: boolean; 
    public cep: boolean;
    public cci: boolean;
    public adm: boolean;
    public observacion: string;

    constructor(_parameters: any) {
            this.codigoInscripcion = (_parameters?.codigoInscripcion != null ? _parameters.codigoInscripcion : undefined);
            this.evaluado = (_parameters?.evaluado != null ? _parameters.evaluado : undefined);
            this.did = (_parameters?.did != null ? _parameters.did : undefined);
            this.tpu = (_parameters?.tpu != null ? _parameters.tpu : undefined);
            this.tmd = (_parameters?.tmd != null ? _parameters.tmd : undefined);
            this.ced = (_parameters?.ced != null ? _parameters.ced : undefined);
            this.cep = (_parameters?.cep != null ? _parameters.cep : undefined);
            this.cci = (_parameters?.cci != null ? _parameters.cci : undefined);
            this.adm = (_parameters?.adm != null ? _parameters.adm : undefined);
            this.observacion = (_parameters?.observacion != null ? _parameters.observacion : undefined);
    }
}