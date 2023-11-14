import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppRequest } from 'src/app/core/base/request/app-request';
import { environment } from 'src/environments/environment';
import{Inscripcion} from '../model/dtos/inscripcion';
import{InscripcionMinimos} from '../model/dtos/inscripcion-minimos';
import{Evaluado} from '../model/dtos/evaluado';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService extends AppRequest {
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


getInscripcionByPerfil(codigoPerfil:string): Observable<Inscripcion[]> {
  const url =  `/api/Inscripcion/inscripcionPerfil?codigoPerfil=${codigoPerfil}`;
  return this.getRequest(url);
}
getAdmitidosHV(codigoPerfil:string): Observable<Inscripcion[]> {
  const url =  `/api/Inscripcion/obtenerAdmitidosHV?codigoPerfil=${codigoPerfil}`;
  return this.getRequest(url);
}

getInscripcionById(codigoInscripcion:string): Observable<Inscripcion> {
  const url =  `/api/Inscripcion/consultar?codigoInscripcion=${codigoInscripcion}`;
  return this.getRequest(url);
}

getInscripcionMinimos(codigoInscripcion:string): Observable<InscripcionMinimos[]> {
  const url =  `/api/Inscripcion/consultarReqMinimos?codigoInscripcion=${codigoInscripcion}`;
  return this.getRequest(url);
}

saveDocMinimo(datosDocMinimo:InscripcionMinimos[]): Observable<any> {     
      const url =  `/api/Inscripcion/guardarRequisito`;
      return this.postRequest(url, datosDocMinimo);
}

saveEvaluacionHv(datosHV:any): Observable<any> {     
      const url =  `/api/Inscripcion/guardarHojaVida`;
      return this.postRequest(url, datosHV);
}
getEvaluadosMinimos(codigoPerfil:string): Observable<Evaluado[]> {
  const url =  `/api/Inscripcion/consultarEvaluacionMinimos?codigoPerfil=${codigoPerfil}`;
  return this.getRequest(url);
}

}
