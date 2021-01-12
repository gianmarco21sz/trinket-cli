import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Imagenes } from '../models/imagenes';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  public url : string;   
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) { 
    this.url = environment.uri+'producto/';   
    
  }

  listar():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url,{headers:this.headers});
  }

  buscar(id_prod : number):Observable<Producto>{
    return this.http.get<Producto>(this.url+`buscar/${id_prod}`,{headers:this.headers});
  }

  agregar(producto : Producto):Observable<Producto>{
    return this.http.post<Producto>(this.url,producto,{headers:this.headers});
  }

  actualizar(producto : Producto):Observable<Producto>{
    return this.http.put<Producto>(this.url+producto.id_prod,producto,{headers:this.headers});
  }

  eliminar(id_prod : number):Observable<boolean>{
    return this.http.delete<boolean>(this.url+id_prod,{headers:this.headers});
  }

  validarDelProducto(id_prod : number):Observable<String[]>{
    return this.http.get<String[]>(this.url+'validarDelProducto/'+id_prod,{headers:this.headers});
  }

  validarNombreProducto(nombre : string):Observable<boolean>{
    return this.http.get<boolean>(this.url+'validarNombreProducto/'+nombre,{headers:this.headers});
  }

  validarNombreProductoEdit(nombre : string,id : number):Observable<boolean>{
    return this.http.get<boolean>(this.url+'validarNombreProductoEdit/'+nombre+'/'+id,{headers:this.headers});
  }

  imgXprod(id_prod : number):Observable<Imagenes[]>{
    return this.http.get<Imagenes[]>(this.url+`imgXprod/${id_prod}`,{headers:this.headers});
  }

  cargarImagen(id_prod:number, photo: File):Observable<string> {
    const fd = new FormData();    
    fd.append('file', photo);
    return this.http.post<string>(this.url+'subirArchivo/'+id_prod, fd);
  }

  actualizarImagen(id_img:number , photo : File):Observable<string>{
    const fd = new FormData();    
    fd.append('file', photo);
    return this.http.put<string>(this.url+'subirArchivo/'+id_img, fd);
  }

  /*buscarProductoTexto(texto : string):Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url+`buscarProductoTexto/${texto}`,{headers:this.headers});
  }

  buscarProductoCategoria(cod : number):Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url+`buscarProductoCategoria/${cod}`,{headers:this.headers});
  }*/
}
