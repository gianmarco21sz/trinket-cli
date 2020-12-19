import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  public url : string;
  headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) { 
    this.url = environment.uri+'cliente/';
  }

  listar():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url,{headers : this.headers});
  }

  buscar(id : number):Observable<Cliente>{
    return this.http.get<Cliente>(this.url+id,{headers:this.headers});
  }

  agregar(cliente : Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url,cliente,{headers:this.headers});
  }

  actualizar(cliente : Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.url+cliente.id_cli,cliente,{headers:this.headers});
  }

  eliminar(id : number):Observable<boolean>{
    return this.http.delete<boolean>(this.url+id,{headers:this.headers});
  }
}
