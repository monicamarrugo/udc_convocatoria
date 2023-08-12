import { Component, OnInit } from '@angular/core';
import { DocumentosService} from 'src/app/convocatoria/services/documentos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private documentoService: DocumentosService){
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

}
