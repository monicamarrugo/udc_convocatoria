import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppRequest } from 'src/app/core/base/request/app-request';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService extends AppRequest {
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


  saveInscripcion(datosInscripcion:any): Observable<any> {     
      const url =  `/api/Inscripcion/inscribir`;
      return this.postRequest(url, datosInscripcion);
    }



}