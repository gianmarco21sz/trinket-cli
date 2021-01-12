import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Zona } from '../models/zona';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {
  url : string = environment.uri+'zona/';
  headers = new HttpHeaders().set("Content-Type","application/json");

  constructor(private http:HttpClient) { }

  listar():Observable<Zona[]>{
    return this.http.get<Zona[]>(this.url,{headers:this.headers});
  }
}
