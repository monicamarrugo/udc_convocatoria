import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppRequest } from 'src/app/core/base/request/app-request';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { Convocatoria } from '../model/dtos/convocatoria';
import { Comision } from '../model/comision';

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

  getConvocatoria(codigoConvocatoria:string): Observable<Convocatoria> {
    const url =  `/api/Convocatoria/obtenerConvocatoria?idConvocatoria=${codigoConvocatoria}`;
    return this.getRequest(url);
  }
  login(datosUsuario:any): Observable<Comision> {     
        const url =  `/api/Convocatoria/autenticarComision`;
        return this.postRequest(url, datosUsuario);
  }

  getVerificacionHojaVida(codigoInscripcion:string): Observable<any> {
    const url =  `/api/Convocatoria/buscarEvaluacionHojaVida?codigoInscripcion=${codigoInscripcion}`;
    return this.getRequest(url);
  }

  getConsolidadoVerificacionHojaVida(listaPerfiles:string[]): Observable<any> {
    const url =  `/api/Convocatoria/consolidadoHojaVida`;
    return this.postRequest(url, listaPerfiles);

  }


}
