
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppRequest } from 'src/app/core/base/request/app-request';
import { environment } from 'src/environments/environment';
import { Item } from 'src/app/convocatoria/model/item';
import {Comision} from 'src/app/convocatoria/model/comision';
import {FacultadPerfil} from 'src/app/convocatoria/model/facultad-perfil';

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

  getPerfiles(): Observable<Item[]> {
    const url = `/api/ListasTiposBasicos/GetListaPerfiles`;
    return this.getRequest(url);
  }
  getPaisesMock(): Observable<Item[]> {
    return this.http.get<Item[]>('assets/datos/paises.json');
  }

  getTiposDocumento(): Observable<Item[]> {
    const url = `/api/ListasTiposBasicos/GetListaTiposDocumentos`;
    return this.getRequest(url);
  }

  getComisiones(): Observable<Comision[]> {
    const url = `/api/Convocatoria/listarComision`;
    return this.getRequest(url);
  }
  getPerfilesComision(idComision:number): Observable<FacultadPerfil[]> {
    const url = `/api/ListasTiposBasicos/GetListaFacultadPerfil?idComision=${idComision}`
    return this.getRequest(url);
  }

  

}