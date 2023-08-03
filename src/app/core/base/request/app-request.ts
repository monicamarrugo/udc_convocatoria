import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

/**
 * All service should inherit this class
 * */
export abstract class AppRequest {
  private headers: HttpHeaders;
  protected baseUrl: string = '';

  /**
   * Create a new instance of AppRequest
   * @param {HttpClient} http - Object for creating HTTP request
   */
  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders();
    // this.addHeader([
    //   {Key: "Access-Control-Allow-Origin", Value: "*"},
    //   {Key: "Access-Control-Allow-Headers", Value: "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method"},
    //   {Key: "Access-Control-Allow-Methods", Value: "GET, POST, OPTIONS, PUT, DELETE"},
    //   {Key: "Allow", Value: "GET, POST, OPTIONS, PUT, DELETE"},
    // ])
  }

  /**
   * Add custom header for specific HTTP request
   * @param {{ Key: string, Value: string }[]} headers - Custom headers to pass on the request
   * @return {void}
   */
  public addHeader(headers: { Key: string; Value: string }[]): void {
    headers.forEach(
      (header) => (this.headers = this.headers.set(header.Key, header.Value))
    );
  }

  /**
   * Make a HTTP Request with verb GET
   * @param {string} url - Custom URL for the request
   * @param {{ Key: string, Value: any }[]} params - Parameters for building query string
   * @return {Observable<T>} - Return an Observable of generic type
   */
  protected getRequest<T>(
    url?: string,
    params?: { Key: string; Value: any }[],
    baseCustom?:string
  ): Observable<T> {
    const urlService = (baseCustom) ? baseCustom : this.baseUrl;
    return this.http.get<T>(`${urlService}${url}`, {
      headers: this.headers,
      params: this.addParameters(params),
    });
  }

  protected getRequestHttpParams<T>(
    url?: string,
    params?: any,
    baseCustom?:string
  ): Observable<T> {
    const urlService = (baseCustom) ? baseCustom : this.baseUrl;
    return this.http.get<T>(`${urlService}${url}`, {
      headers: this.headers,
      params:  new HttpParams({ fromObject: params }),
    });
  }


  /**
   * Make an HTTP request with the GET verb for files
   * @param {string} url - Custom URL for the request
   * @param {{ Key: string, Value: any }[]} params - Parameters for building query string
   * @return {Observable<T>} - Return an Observable of generic type
   */
    protected getRequestFile(
      url?: string,
      params?: { Key: string; Value: any }[],
      baseCustom?:string
    ){
      const urlService = (baseCustom) ? baseCustom : this.baseUrl;
      return this.http.get(`${urlService}${url}`, {
        responseType: 'blob' as 'json',
        observe: 'response',
        headers: this.headers,
        params: this.addParameters(params),
      });
    }


  /**
   * Make a HTTP Request with verb POST
   * @param {string} url - Custom URL for the request
   * @param {T} body - JSON object to send in the request
   * @param {{ Key: string, Value: any }[]} params - Parameters for building query string
   * @return {Observable<any>} - Return an Observable of any
   */
  protected postRequest<T>(
    url?: string,
    body?: T,
    params?: { Key: string; Value: any }[],
    baseCustom?:string
  ): Observable<any> {
    const urlService = (baseCustom) ? baseCustom : this.baseUrl;
    return this.http.post(`${urlService}${url}`, body, {
      headers: this.headers,
      params: this.addParameters(params),
    });
  }

  /**
   * Make a HTTP Request with verb PUT
   * @param {string} url - Custom URL for the request
   * @param {T} body - JSON object to send in the request
   * @param {{ Key: string, Value: any }[]} params - Parameters for building query string
   * @return {Observable<any>} - Return an Observable of any
   */
  protected putRequest<T>(
    url?: string,
    body?: T,
    params?: { Key: string; Value: any }[],
    baseCustom?:string
  ): Observable<any> {
    const urlService = (baseCustom) ? baseCustom : this.baseUrl;
    return this.http.put(`${urlService}${url}`, body, {
      headers: this.headers,
      params: this.addParameters(params),
    });
  }

  /**
   * Make a HTTP Request with verb DELETE
   * @param {string} url - Custom URL for the request
   * @param {{ Key: string, Value: any }[]} params - Parameters for building query string
   * @return {Observable<any>} - Return an Observable of any
   */
  protected deleteRequest(
    url?: string,
    params?: { Key: string; Value: any }[],
    baseCustom?:string
  ): Observable<any> {
    const urlService = (baseCustom) ? baseCustom : this.baseUrl;
    return this.http.delete(`${urlService}${url}`, {
      headers: this.headers,
      params: this.addParameters(params),
    });
  }

  /**
   * Build a query string
   * @param {{ Key: string, Value: any }[]} params - Parameters for building query string
   * @return {HttpParams} - Object that contains the parameters
   */
  private addParameters(params?: { Key: string; Value: any }[]): HttpParams {
    let parameters = new HttpParams();
    if (params) {
      params.forEach(
        (param) => (parameters = parameters.set(param.Key, param.Value))
      );
    }
    return parameters;
  }
}