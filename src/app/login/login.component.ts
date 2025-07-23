import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConvocatoriaService} from 'src/app/convocatoria/services/convocatoria.service';
import { PasswordEncryptionService} from 'src/app/convocatoria/services/password-encryption.service';
import {Comision} from '../convocatoria/model/comision';
import {Usuario} from '../convocatoria/model/dtos/usuario';
import {CustomModalComponent,TipoMensajeEnum} from 'src/app/widgets/custom-modal/custom-modal.component';
import {StorageService} from '../convocatoria/services/storage.service';
import { DocumentosService} from 'src/app/convocatoria/services/documentos.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private convocatoriaService: ConvocatoriaService,
    public _dialog: MatDialog,
    private router: Router,
    private passwordEncryptionService : PasswordEncryptionService,
    private storageService: StorageService,
    private documentoService: DocumentosService
    ){
      
    this.loginForm = this.formBuilder.group({
      nombreUsuario: ['', Validators.required],
      contrasena:['', Validators.required],
    });
  }

  ingresar(){
    if(this.loginForm.valid){
      let encryptedPassword = this.passwordEncryptionService.encryptPasswordToBase64(this.loginForm.get('contrasena')
      ?.value);
      let dto: Usuario = new Usuario({
        usuario: this.loginForm.get('nombreUsuario')?.value,
        contrasena: encryptedPassword
      });

      this.convocatoriaService
                  .login(dto)
                  .subscribe((result:Comision)=>{
  
                        if(result.id){
                          this.storageService.setCurrentSession(result);
                          /*if(result.tipoUsuario == 'COMITE_CENTRAL'){
                            this.router.navigate(['/convocatoria/reporte']);
                          }else{
                            this.router.navigate(['/convocatoria/competencias']);
                          }*/
                          
                        }else{
                          var dConfirmError = this._dialog.open(CustomModalComponent,
                                { width: '450px',
                                  data: {
                                    mensaje: "¡Usuario no encontrado!",
                                  tipoMensaje: TipoMensajeEnum.warning
                                }
                              });  
                        }
                  });
    }
  }

  downloadDocumento(fileName:string){
    this.documentoService.downloadFile(fileName).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' }); // Cambia el tipo MIME según tu archivo
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
