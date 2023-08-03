
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppRequest } from 'src/app/core/base/request/app-request';
import { environment } from 'src/environments/environment';
import { Item } from 'src/app/convocatoria/model/item'

@Injectable({
    providedIn: 'root',
  })
  export class ListasService extends AppRequest {
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

  
  getPerfilesMock(): Observable<Item[]> {
    return this.http.get<Item[]>('assets/datos/perfiles.json');
  }
  getPaisesMock(): Observable<Item[]> {
    return this.http.get<Item[]>('assets/datos/paises.json');
  }

  

}