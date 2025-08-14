import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmacionComponent } from 'src/app/widgets/confirmacion/confirmacion.component';
import { CustomModalComponent, TipoMensajeEnum } from 'src/app/widgets/custom-modal/custom-modal.component';
import { DocumentosService } from '../../services/documentos.service';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html'
})
export class UploadFileDialogComponent {
  file: File | null = null;
  uploading = false;
  errorMsg = '';
  readonly maxBytes = 5 * 1024 * 1024; // 5MB

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { row: any; codigoInscripcion: string },
    private ref: MatDialogRef<UploadFileDialogComponent>,
    private dialog: MatDialog,
    private documentoService: DocumentosService
  ) {}

  onFileChange(e: Event) {
    this.errorMsg = '';
    const input = e.target as HTMLInputElement;
    const f = input.files && input.files[0];
    if (!f) { this.file = null; return; }

    const isPdf = f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) { this.file = null; this.errorMsg = 'Solo se permiten documentos PDF.'; return; }
    if (f.size > this.maxBytes) { this.file = null; this.errorMsg = 'El archivo supera el tamaño máximo (5MB).'; return; }

    this.file = f;
  }

  cancelar() { this.ref.close(); }

  subir() {
    if (!this.file) { this.errorMsg = 'Seleccione un PDF.'; return; }

    const confirmRef = this.dialog.open(ConfirmacionComponent, {
      width: '520px',
      maxHeight: '95vh',
      disableClose: true,
      data: { titulo: 'Guardar Documento', mensaje: '¿Está seguro de guardar el documento ingresado?' }
    });

    confirmRef.afterClosed().subscribe((ok: boolean) => {
      if (!ok) return;

      this.uploading = true;
      const fd = new FormData();
      fd.append('file', this.file as Blob);
      fd.append('idDocumento', this.data.row.idDocumento);
      fd.append('codigoInscripcion', this.data.codigoInscripcion);
      fd.append('tipoDocumento', this.data.row.tipoDocumento);
      fd.append('subtipoDocumento', this.data.row.subtipoDocumento ?? '');

      this.documentoService.saveDocumento(fd).subscribe({
        next: (resp: any) => {
          this.uploading = false;
          if (resp?.error === 'NO') {
            this.dialog.open(CustomModalComponent, {
              width: '450px',
              data: { mensaje: '¡Documento cargado con éxito!', tipoMensaje: TipoMensajeEnum.success }
            }).afterClosed().subscribe(() => this.ref.close({ uploaded: true }));
          } else {
            this.dialog.open(CustomModalComponent, {
              width: '450px',
              data: { mensaje: resp?.errorDetail ?? 'Error al subir el documento.', tipoMensaje: TipoMensajeEnum.wrong }
            });
          }
        },
        error: () => {
          this.uploading = false;
          this.dialog.open(CustomModalComponent, {
            width: '450px',
            data: { mensaje: 'Ocurrió un error al subir el documento.', tipoMensaje: TipoMensajeEnum.wrong }
          });
        }
      });
    });
  }
}
