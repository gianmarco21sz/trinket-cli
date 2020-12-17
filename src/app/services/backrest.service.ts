import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backrest } from '../models/backrest';

@Injectable({
  providedIn: 'root'
})
export class BackrestService {
  url : string = "http://192.168.1.13:1151/api/backup/";
  headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) { }

  listar():Observable<backrest[]>{
    return this.http.get<backrest[]>(this.url,{headers:this.headers});
  }

  agregar( backup : backrest):Observable<backrest>{
    return this.http.post<backrest>(this.url,backup,{headers:this.headers});
  }

  eliminar(id : number):Observable<boolean>{
    return this.http.delete<boolean>(this.url+id,{headers:this.headers});
  }

  restaurar(backup : backrest):Observable<string>{
    return this.http.post<string>(this.url+"restaurar",backup,{headers:this.headers});
  }
}
