import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListasService } from '../../services/listas.service'
import { ConvocatoriaService } from '../../services/convocatoria.service'
import { Item } from 'src/app/convocatoria/model/item'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmacionComponent } from 'src/app/widgets/confirmacion/confirmacion.component';
import { CustomModalComponent, TipoMensajeEnum } from 'src/app/widgets/custom-modal/custom-modal.component';
import { Inscripcion } from '../../model/dtos/inscripcion';
import { RespuestaTransaccion } from '../../model/dtos/respuesta-transaccion';
import { Router } from '@angular/router';
import { Convocatoria } from '../../model/dtos/convocatoria';
import { ConfirmEmailErrorMatcher } from 'src/app/utility/matchers/confirm-email-error.matcher';

@Component({
  selector: 'app-registro-participante',
  templateUrl: './registro-participante.component.html',
  styleUrls: ['./registro-participante.component.css']
})
export class RegistroParticipanteComponent implements OnInit {

  public registroForm!: FormGroup;
  public nonSelectedOptionValue: string = '';
  public lPerfiles: Item[] = [];
  public lPaises: Item[] = [];
  descripcionPerfil: string | undefined = '';
  selectedPerfil: any = null;
  isCheckedPoliticas: boolean = false;
  isCheckedTerminos: boolean = false;
  isCheckedCorreos: boolean = false;
  isCheckedCustodiar: boolean = false;
  isCheckedVeraz: boolean = false;
  disableSave: boolean = false;
  public selectedConvocatoria: string = '1';
  patronEmail = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  conovocatorias: Convocatoria[] = [{ codigo: '1', nombre: 'Convocatoria 02046', fechaInicio: '', fechaFin: '', activo: true }];
  selectedOption: string = 'Opción 2'; // Valor por defecto
  matcher = new ConfirmEmailErrorMatcher();
  constructor(
    private formBuilder: FormBuilder,
    private listaService: ListasService,
    private convocatoriaService: ConvocatoriaService,
    public _dialog: MatDialog,
    private router: Router
  ) {

    this.disableSave = false;
    
    this.selectedConvocatoria = '1';
  }

   emailsCoincidenValidator = (group: FormGroup) => {
    const email = group.get('email')?.value ?? '';
    const confirm = group.get('emailConfirmacion')?.value ?? '';
    return email && confirm && email === confirm ? null : { emailMismatch: true };
  };

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      codigoConvocatoria: ['1', Validators.required],
      codigoPerfil: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.patronEmail)]],
      emailConfirmacion: ['', { validators: [Validators.required], updateOn: 'blur' }],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
      descripcion: [{ value: '', disabled: true }],
      discapacidad: ['', Validators.required],
      aceptoPoliticas: [false, Validators.requiredTrue],
      aceptoCorreos: [false, Validators.requiredTrue],
      aceptoVeraz: [false, Validators.requiredTrue],
      aceptoCustodiar: [false, Validators.requiredTrue],
      aceptoNotificaciones: [false, Validators.requiredTrue],
    }, { validators: this.emailsCoincidenValidator });

    this.validarConvocatoria('1');

    // Si la descripción debe llenarse según el perfil seleccionado:
    this.registroForm.get('codigoPerfil')?.valueChanges.subscribe(cod => {
      const desc = this.obtenerDescripcionPerfil(cod); // reemplaza con tu lógica
      this.registroForm.get('descripcion')?.setValue(desc);
    });
  }

  validarConvocatoria(codigoConvocatoria: string) {
    this.convocatoriaService
      .getConvocatoria(codigoConvocatoria)
      .subscribe((convocatoria: Convocatoria) => {
        if (!convocatoria.activo) {
          this.deshabilitarFormulario();
        }
        else {
          this.getPerfiles();
        }
      });
  }

  public saveInscripcion(): void {
     if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }
      this.disableSave = true;
      const dialogRef = this._dialog.open(ConfirmacionComponent, {
        width: '95%',
        maxHeight: '95vh',
        disableClose: true,
        data: {
          titulo: "Guardar Inscripción",
          mensaje: "¿Esta seguro de registrar la inscripción con los datos ingresados?"
        }
      });

      dialogRef.afterClosed().subscribe((response: boolean) => {
        if (response && response == true) {
          let dto: Inscripcion = new Inscripcion({
            codigoConvocatoria: this.registroForm.controls["codigoConvocatoria"].value,
            codigoPerfil: this.registroForm.controls["codigoPerfil"].value,
            tipoIdentificacion: this.registroForm.controls["tipoIdentificacion"].value,
            identificacion: this.registroForm.controls["identificacion"].value,
            nombres: this.registroForm.controls["nombres"].value,
            apellidos: this.registroForm.controls["apellidos"].value,
            email: this.registroForm.controls["email"].value,
            telefono: this.registroForm.controls["telefono"].value,
            discapacidad: this.registroForm.get('discapacidad')?.value === '1'
          });

          this.convocatoriaService
            .saveInscripcion(dto)
            .subscribe((result: RespuestaTransaccion) => {

              if (result.error == 'NO') {
                this.deshabilitarFormulario();
                var dConfirm = this._dialog.open(CustomModalComponent,
                  {
                    width: '450px',
                    data: {
                      mensaje: ": Se ha generado el siguiente código de inscripción, por favor guárdelo. \n Este código será necesario para acceder a consultar y/o cargar información en las todas las etapas del concurso. \n Este código no será enviado por ningún otro medio. Recuerde, la custodia de este código es responsabilidad exclusiva del aspirante. \n" + result.respuesta,
                      tipoMensaje: TipoMensajeEnum.success
                    }
                  });

                dConfirm.afterClosed().subscribe(result => {
                  this.router.navigate(['/convocatoria/documentos']);
                });
              } else {
                this.disableSave = false;
                var dConfirmError = this._dialog.open(CustomModalComponent,
                  {
                    width: '450px',
                    data: {
                      mensaje: "¡Atención!: \n " + result.errorDetail,
                      tipoMensaje: TipoMensajeEnum.success
                    }
                  });

                dConfirmError.afterClosed().subscribe(result => {
                  this.disableSave = false;
                });
              }
            });
        }
        else {
          this.disableSave = false;
        }
      });
    
  }

  deshabilitarFormulario() {
    Object.keys(this.registroForm.controls).forEach(controlName => {
      this.registroForm.controls[controlName].disable();
    });
    this.disableSave = true;
  }

  private getPerfiles() {

    this.registroForm.controls['codigoPerfil'].setValue(
      this.nonSelectedOptionValue
    );

    this.listaService
      .getPerfiles()
      .subscribe((perfiles: Item[]) => {
        this.lPerfiles = perfiles
      });
  }

  public obtenerDescripcionPerfil(cod: string): string {
  if (!cod) {
    this.descripcionPerfil = '';
    return '';
  }
  const perfil = this.lPerfiles.find(p => p?.codigo === cod);
  const desc = perfil?.descripcion ?? '';
  this.descripcionPerfil = desc; // si lo muestras en otro lado
  return desc;
}
}
