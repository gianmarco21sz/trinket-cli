import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tipoDocIdentidad } from '../models/tipoDocIdentidad';

@Injectable({
  providedIn: 'root'
})
export class TipoDocIdentidadService {
  url : string = environment.uri+'tipoDoc/';
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) {    
  }

  listar():Observable<tipoDocIdentidad[]>{
    return this.http.get<tipoDocIdentidad[]>(this.url+'listar',{headers:this.headers});
  }
}
