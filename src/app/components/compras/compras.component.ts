import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { ItemCarro } from 'src/app/models/itemCarro';
import { Producto } from 'src/app/models/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CompraService } from 'src/app/services/compra.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {
  lista : Producto[]=[];   
  listaFiltro : Producto[]=[];  
  listaFiltroTexto : Producto[]=[];  
  listaCategoria : Categoria[]=[];
  seleccionado : number = 0;
  estado : boolean = false;
  constructor(private productoService:ProductoService,
              public compraService:CompraService,
              private categoriaService : CategoriaService) { }

  ngOnInit(): void {    
    this.listarProductos();
    this.cargarCategorias();
  }

  cargarCategorias(){
    this.categoriaService.listar().subscribe((data:Categoria[])=>{
      this.listaCategoria = data;
    });
  }

  buscar(texto:string){          
    this.listaFiltroTexto = [];
    for(let f of this.listaFiltro){      
      if(f.nom_prod.indexOf(texto)!=-1){
        this.listaFiltroTexto.push(f);
      }
    }
  }  

  filtrarXcat(id_cat : number){  
    this.seleccionado = id_cat;  
    this.listaFiltro = [];
    for(let f of this.lista){
      if(+f.id_cat === +id_cat){
        this.listaFiltro.push(f);
      }
    }
    this.listaFiltroTexto = this.listaFiltro;
  }

  listarProductos(){
    this.seleccionado = 0;  
    this.productoService.listar().subscribe((data:Producto[])=>{
      this.lista = data; 
      this.listaFiltro = this.lista;
      this.listaFiltroTexto = this.listaFiltro;    
      setTimeout(()=>{
        this.estado = true;
      },500)
    });
  }

  agregar(u : Producto){
    let item : ItemCarro = {
      prod_id : u.id_prod,
      nombre_prod : u.nom_prod,
      imagen : u.nom_producto,
      unit_price_ord_det : u.precio_unit_prod,
      cant_ord_det : 1      
    };
    this.compraService.agregar(item);  
    this.compraService.agregado = true;
    setTimeout(()=>{
      this.compraService.agregado = false;;
    },1000);  
  }

}
