import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CONNECTION } from '../global';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class RestUserService {
  public uri:string;
  public httpOptions = {
    headers:new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  constructor(private http:HttpClient) {
    this.uri = CONNECTION.URI + 'user/';
  }

  //ENDPOINT REGISTRARSE
  registrarse(user:User): Observable<any>{
    let params = JSON.stringify(user);
    return this.http.post(this.uri+'registrarse', params, this.httpOptions);
  }

  //ENDPOINT LOGIN
  login(body: any){
    let params = JSON.stringify(body);
    return this.http.post(this.uri + 'iniciar_Sesion', params, this.httpOptions);
  }

  listar_Usuarios(){
    return this.http.get(this.uri + 'listar_Usuarios',this.httpOptions);
  }

  carga_Masiva_Usuarios(body: any){
    let params = JSON.stringify(body);
    return this.http.post(this.uri + 'carga_Masiva', params, this.httpOptions);
  }

  archivo_CSV(body:any){
    let params = JSON.stringify(body);
    return this.http.post(this.uri + 'usuario_CSV', params, this.httpOptions);
  }
}
