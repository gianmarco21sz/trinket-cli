import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Via } from '../models/via';

@Injectable({
  providedIn: 'root'
})
export class ViaService {
  url : string = environment.uri+'via/';
  headers = new HttpHeaders().set("Content-Type","application/json");

  constructor(private http:HttpClient) { }

  listar():Observable<Via[]>{
    return this.http.get<Via[]>(this.url,{headers:this.headers});
  }
}
