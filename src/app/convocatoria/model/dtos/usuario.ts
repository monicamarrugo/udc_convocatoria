export class Usuario{
    usuario: string;
    contrasena: string;

    constructor(_parameters: any) {
            this.usuario = (_parameters?.usuario != null ? _parameters.usuario : undefined);
            this.contrasena = (_parameters?.contrasena != null ? _parameters.contrasena : undefined);
    }
}