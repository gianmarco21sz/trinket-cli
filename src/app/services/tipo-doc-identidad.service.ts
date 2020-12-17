import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tipoDocIdentidad } from '../models/tipoDocIdentidad';

@Injectable({
  providedIn: 'root'
})
export class TipoDocIdentidadService {
  url : string;
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) {
    this.url = 'http://192.168.1.13:1151/api/tipoDoc/';
  }

  listar():Observable<tipoDocIdentidad[]>{
    return this.http.get<tipoDocIdentidad[]>(this.url+'listar',{headers:this.headers});
  }
}
