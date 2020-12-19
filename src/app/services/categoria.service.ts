import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  public url : string = environment.uri+'categoria/'; 
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) 
  {
    
  }

  listar():Observable<Categoria[]>{    
    return this.http.get<Categoria[]>(this.url,{headers:this.headers});
  }

  buscar(id : number):Observable<Categoria>{
    return this.http.get<Categoria>(this.url+id,{headers:this.headers});
  }

  verificarProdXcat(id : number):Observable<boolean>{
    return this.http.get<boolean>(this.url+`verificarProdXcat/${id}`,{headers:this.headers});
  }

  validarCategoriaNom(nom : string):Observable<boolean>{
    return this.http.get<boolean>(this.url+`validarCategoriaNom/${nom}`,{headers:this.headers});
  }

  agregar(categoria : Categoria):Observable<Categoria>{
    return this.http.post<Categoria>(this.url,categoria,{headers:this.headers});
  }

  actualizar(categoria : Categoria):Observable<Categoria>{
    return this.http.put<Categoria>(this.url+categoria.id_cat,categoria,{headers:this.headers});
  }

  eliminar(id : number):Observable<boolean>{
    return this.http.delete<boolean>(this.url+id,{headers:this.headers});
  }
}
