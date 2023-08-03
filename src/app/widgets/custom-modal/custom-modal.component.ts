import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export enum TipoMensajeEnum {
    success = 'success',
    primary = 'primary',
    warning = 'warning',
    wrong = 'wrong'
}


@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css']
})
export class CustomModalComponent implements OnInit {
      public encabezadoModal = '';
      constructor(
          public dialogRef: MatDialogRef<CustomModalComponent>,
          @Inject(MAT_DIALOG_DATA) public data: any) {}
  
      ngOnInit(): void {
          switch (this.data.tipoMensaje) {
              case TipoMensajeEnum.success:
                  this.encabezadoModal = '<div class="alert-success-govco alert alert-dismissible fade show" aria-label="Alerta informativa"><div class="alert-heading">' +
                  '<i class="fas fa-check-circle icon-color-green fa-2x pr-2"></i><span class="headline-l-govco">$mensaje</span></div></div>'
                  .replace('$mensaje', this.data.mensaje);
                  break;
              case TipoMensajeEnum.primary:
                  this.encabezadoModal = '<div class="alert-primary-govco alert alert-dismissible fade show" aria-label="Alerta informativa"><div class="alert-heading">' +
                  '<i class="fas fa-check-circle icon-color-blue fa-2x pr-2"></i><span class="headline-l-govco">Información</span></div><p>$mensaje</p></div>'.replace('$mensaje', this.data.mensaje);
                  break;
              case TipoMensajeEnum.warning:
                  this.encabezadoModal = '<div class="alert-warning-govco alert alert-dismissible fade show" aria-label="Alerta informativa"><div class="alert-heading">' +
                  '<i class="fas fa-check-circle icon-color-yellow fa-2x pr-2"></i><span class="headline-l-govco">Importante</span></div><p>$mensaje</p></div>'.replace('$mensaje', this.data.mensaje);
                  break;
              case TipoMensajeEnum.wrong:
                  this.encabezadoModal = '<div class="alert-wrong-govco alert alert-dismissible fade show" aria-label="Alerta informativa"><div class="alert-heading">' +
                  '<i class="fas fa-times icon-color-red fa-2x pr-2"></i><span class="headline-l-govco">Importante</span></div><p>$mensaje</p></div>'.replace('$mensaje', this.data.mensaje);
                  break;
              default:
                  this.encabezadoModal = '<div class="alert-primary-govco alert alert-dismissible fade show" aria-label="Alerta informativa"><div class="alert-heading">' +
                  '<i class="fas fa-exclamation-circle icon-color-blue fa-2x pr-2"></i><span class="headline-l-govco">Información</span></div><p>$mensaje</p></div>'.replace('$mensaje', this.data.mensaje);
          }
      }
      
        onNoClick(): void {
          this.dialogRef.close();
        }
    }
