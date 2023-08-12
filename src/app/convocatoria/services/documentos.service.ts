import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppRequest } from 'src/app/core/base/request/app-request';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import {ResponseDocumento} from '../model/response-documento';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService extends AppRequest {
  /**
   * PersonalService constructor
   * @param {HttpClient} http - Angular library to make an http request
   * @param {GlobaldataService} globalDataService - Parameter for working with data global.
   * @param {Store<ICoreState>} Store - store that contains different stores
   */
  constructor(
    public override http: HttpClient
    ) {
    super(http);
    this.baseUrl = environment.convocatoriaApiUrl;
    this.addHeader([{Key: 'Authorization', Value: localStorage.getItem('token') || '' }]);
  }

   /**
 * Method to get personal with filter and pagination
 * @param {GetPersonal} payload - Get personal payload
 */


  saveDocumento(datosDocumento:any): Observable<any> {  
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>('https://localhost:7045/api/Documento/subir', datosDocumento, { headers });
      //const url =  `/api/Documento/subir`;
      //return this.postRequest(url, datosDocumento);
    }

  listDocumento(codigoInscripcion:string): Observable<ResponseDocumento[]> {
    const url =  `https://localhost:7045/api/Documento/listar?codigoInscripcion=${codigoInscripcion}`;
    return this.http.get<ResponseDocumento[]>(url);
  }

  downloadFile(fileName:string) {

   
    const apiUrl = `https://localhost:7045/api/Documento/descargar?fileName=${fileName}`; // Cambia la URL según tu configuración

    const requestData = { fileName: fileName };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'blob'
    });

    return this.http.post<any>(apiUrl, requestData, { headers: headers, responseType: 'blob' as 'json' });
  }



}
