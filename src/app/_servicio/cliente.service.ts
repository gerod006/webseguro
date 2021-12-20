import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ObjetoClientes, RespuestaModelo } from '../_modelo/interfaz.service';
import { Observable, BehaviorSubject, Subject, timer } from 'rxjs';
import { GlobalService } from './global.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient, private global: GlobalService ) { }

  ruta_api = this.global.ruta_api;

  ConsultaClientes(): Observable<any> {
    // 
    return this.http.get<RespuestaModelo>(`${this.ruta_api}/Cliente`);
  }

  ConsultaSeguros(): Observable<any> {
    // 
    return this.http.get<RespuestaModelo>(`${this.ruta_api}/seguros`);
  }

  BuscarPorCedula(cedula:string): Observable<any> {
    // 
    return this.http.get<RespuestaModelo>(`${this.ruta_api}/BuscarCedula?cedula=${cedula}`);
  }

  BuscarPorSeguro(seguro:string): Observable<any> {
    // 
    return this.http.get<RespuestaModelo>(`${this.ruta_api}/BuscarSeguro?seguro=${seguro}`);
  }

  CargarClientes(jsonClientes: ObjetoClientes) {
    const headers = { 'content-type': 'application/json'}  
    console.log(1234,jsonClientes);
    return this.http.post<RespuestaModelo>(`${this.ruta_api}/CargarCliente`, jsonClientes)
      .pipe();
  }


}
function retry(arg0: number): import("rxjs").OperatorFunction<RespuestaModelo, unknown> {
  throw new Error('Function not implemented.');
}

