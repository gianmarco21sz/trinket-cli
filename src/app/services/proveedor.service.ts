import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Proveedor } from '../models/proveedor';
const listapaises = require('../models/paises.json');

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  url : string = 'http://192.168.1.13:1151/api/proveedor/';
  headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) { }

  listar():Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(this.url,{headers:this.headers});
  }
  
  buscar(id_prov : number):Observable<Proveedor>{
    return this.http.get<Proveedor>(this.url+id_prov,{headers:this.headers});
  }

  eliminar(id : number):Observable<boolean>{
    return this.http.delete<boolean>(this.url+id,{headers:this.headers});
  }

  agregar(proveedor : Proveedor):Observable<Proveedor>{
    return this.http.post<Proveedor>(this.url,proveedor,{headers:this.headers});
  }

  actualizar(proveedor : Proveedor):Observable<Proveedor>{
    return this.http.put<Proveedor>(this.url+proveedor.id_prov,proveedor,{headers:this.headers});
  }

  validarDocProv(num_doc : string):Observable<boolean>{
    return this.http.get<boolean>(this.url+`validarDoc/${num_doc}`,{headers:this.headers})
  }

  validarDocProvEdit(num_doc : string,id_prov : number):Observable<boolean>{
    return this.http.get<boolean>(this.url+`validarDocEdit/${num_doc}/${id_prov}`,{headers:this.headers})
  }

  validarCorreoProv(correo : string):Observable<boolean>{
    return this.http.get<boolean>(this.url+`validarCorreo/${correo}`,{headers:this.headers});
  }

  validarCorreoProvEdit(correo : string,id : number):Observable<boolean>{
    return this.http.get<boolean>(this.url+`validarCorreoEdit/${correo}/${id}`,{headers:this.headers});
  }

  listarPaises(){
    let paises : string[]=[];
    let i = 0;
    for(let pa of listapaises){
      paises[i]=pa.name;
      i++;
    }       
    return paises; 
  }
}
