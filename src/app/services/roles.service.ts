import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  url : string ;
  headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) { 

    this.url = 'http://192.168.1.13:1151/api/rol/';
  }

  listar():Observable<Rol[]>{
    return this.http.get<Rol[]>(this.url+'listar',{headers:this.headers});
  }
}
