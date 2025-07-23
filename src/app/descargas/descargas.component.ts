import { Component } from '@angular/core';
import { DocumentosService } from '../convocatoria/services/documentos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-descargas',
  templateUrl: './descargas.component.html',
  styleUrls: ['./descargas.component.css']
})
export class DescargasComponent {

  constructor(private documentoService: DocumentosService,  private router: Router,){
    }
  
    ngOnInit(): void {
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
  

  irApagina(url:string){
    this.router.navigate([url]);
  }

}
