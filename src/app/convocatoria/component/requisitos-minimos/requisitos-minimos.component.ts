import { Component, ViewChild  } from '@angular/core';
import {Comision} from '../../model/comision';
import {FacultadPerfil} from '../../model/facultad-perfil';
import {Item} from '../../model/item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListasService} from '../../services/listas.service';
import { InscripcionService} from '../../services/inscripcion.service';
import {Inscripcion } from '../../model/dtos/inscripcion';
import { MatTableDataSource } from '@angular/material/table';
import {DocumentosService} from '../../services/documentos.service';
import {StorageService} from '../../services/storage.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import {CheckRequisitosComponent} from '../check-requisitos/check-requisitos.component';
import {PantallaActaComponent} from '../pantalla-acta/pantalla-acta.component';
import { Router } from '@angular/router';
import {CustomModalComponent,TipoMensajeEnum} from 'src/app/widgets/custom-modal/custom-modal.component';
import { HojaVidaComponent } from '../hoja-vida/hoja-vida.component';

@Component({
  selector: 'app-requisitos-minimos',
  templateUrl: './requisitos-minimos.component.html',
  styleUrls: ['./requisitos-minimos.component.css']
})
export class RequisitosMinimosComponent {

  public lComisiones: Comision[] = [];
  public lPerfiles: FacultadPerfil[] = [];
  public requisitosForm: FormGroup;
  public nonSelectedOptionValue: string = '';
  public selectedPerfil:any = null;
  public selectedComision:any=null;
  public mostrarResultados: boolean= false;
  public mostrarNoResultados: boolean = false;
  public  disableDown:boolean=false;
  public dataSource: MatTableDataSource<Inscripcion>;
  public displayedColumns: string[] = [
    'nombres',
    'apellidos',
    'codigoInscripcion',

    'acciones'
    
   ];
   public totalInscripciones: number  = 100;

   parameters!: any | undefined;
   listaPerfiles!: string[] |undefined;

    constructor(private formBuilder: FormBuilder,
    private listaService: ListasService,
    private inscripcionService : InscripcionService,
    private documentoService: DocumentosService,
    public _dialog: MatDialog,
    private storageService: StorageService,
    private router: Router,){
    this.mostrarResultados = false;
    this.mostrarNoResultados = false;
    this.dataSource = new MatTableDataSource<Inscripcion>([]);
    this.requisitosForm = this.formBuilder.group({
      idComision: ['', Validators.required],
      codigoPerfil: ['', Validators.required]
     });
     this.getPerfiles();
  }
  ngAfterViewInit() {
    
  }
  ngOnInit(): void {
    
   }

  verConsolidado(){
    this.parameters = undefined;
    this.mostrarResultados =false;
    this.selectedPerfil = undefined;
    this.listaPerfiles = this.lPerfiles.map( p => p.perfil);
  }
  private getComisiones() {
    this.requisitosForm.controls['idComision'].setValue(
       this.nonSelectedOptionValue
     );
 
     this.listaService
       .getComisiones()
       .subscribe({
               next: (data) => { 
                 this.lComisiones = data;
                   },
               error: (error) => {
               },
                 });
}
private getPerfiles(){
  let comision = this.storageService.loadSessionData();
  this.requisitosForm.controls['codigoPerfil'].setValue(
    this.nonSelectedOptionValue
  );
  this.listaService
    .getPerfilesComision(comision?.id!)
    .subscribe({
            next: (data) => { 
              this.lPerfiles = data;
                },
            error: (error) => {
            },
              });
}

buscarInscripcion(event: any){
  
  if(this.selectedPerfil){
    this.parameters = undefined;
    this.listaPerfiles = undefined;

    this.inscripcionService.getInscripcionByPerfil(this.selectedPerfil)
    .subscribe({
      next: (inscripciones: Inscripcion[]) => {     
        if (inscripciones.length > 0) {
          this.mostrarResultados = true;
          this.mostrarNoResultados = false;
          this.totalInscripciones = inscripciones.length;
          this.dataSource.data = inscripciones;
        } else {
          this.mostrarResultados = false;
          this.mostrarNoResultados = true;
          this.dataSource.data = [];
        }
      }
  });
}
}

downloadDocumentos(row: any){
  this.disableDown = true;
  this.documentoService.descargarDocumentosZip(row.codigoInscripcion).subscribe(response => {
    console.log(response);
    if(response.error){
      if(response.error == "SI"){
        var dConfirm = this._dialog.open(CustomModalComponent,
              { width: '450px',
                data: {
                mensaje: response.errorDetail,
                tipoMensaje: TipoMensajeEnum.success
              }
            }); 
      }

    }else{
        const blob = new Blob([response], { type: 'application/zip' }); // Cambia el tipo MIME según tu archivo
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = row.codigoInscripcion+'.zip';
        a.click();
        window.URL.revokeObjectURL(url);
    }
    this.disableDown = false;
  });
  this.disableDown = false;
}

verVerificadorHv(row: any) {
  const participante: any = {
    codigoInscripcion: row.codigoInscripcion,
    identificacion: row.identificacion,
    nombre: row.nombres +" "+ row.apellidos
  };
  this.mostrarResultados =false;
  this.listaPerfiles = undefined;
  this.parameters = participante;
}

verVerificadorRequisitos(row: any) {
  const dialogRef = this._dialog.open(CheckRequisitosComponent, {
    width: '95%',
    maxHeight: '95vh',
    disableClose: false,
    data: {
      codigoInscripcion: row.codigoInscripcion,
    },
  });
}


verReporte(row: any) {
  const url = this.router.serializeUrl(
    this.router.createUrlTree(['/convocatoria/reporte', row.codigoInscripcion])
  );

  window.open(url, '_blank');
}

logout() {
  this.storageService.logout();
}

volver(){
  this.parameters = undefined;
  this.mostrarResultados =true;
 
}

}
