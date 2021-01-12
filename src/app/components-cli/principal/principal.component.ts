import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { ItemCarroCli } from 'src/app/models/itemCarroCli';
import { Producto } from 'src/app/models/producto';
import { tipoDocIdentidad } from 'src/app/models/tipoDocIdentidad';
import { Via } from 'src/app/models/via';
import { Zona } from 'src/app/models/zona';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { CompraService } from 'src/app/services/compra.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  lista: Producto[] = [];
  listaFiltro: Producto[] = [];
  listaFiltroTexto: Producto[] = [];
  listaCategoria: Categoria[] = [];
  texto : string = "";
  aProducto: Producto;
  estado : boolean = false;
  seleccionado: number = 0;
  pageActual : number = 1;
  show : boolean = false;

  constructor(private categoriaService:CategoriaService,
              private productoService:ProductoService,
              public compraService : CompraService) {

    this.listarProductos();
    this.cargarCategorias();
   }

  ngOnInit(): void {
  }

  cargarCategorias() {
    this.categoriaService.listar().subscribe((data: Categoria[]) => {
      this.listaCategoria = data;
    });
  }

  buscar() {
    this.listaFiltroTexto = [];
    console.log(this.texto);
    if(this.texto === ""){
      this.listaFiltroTexto = this.lista;
    }else{      
      for (let f of this.listaFiltro) {
        if (f.nom_prod.toLowerCase().indexOf(this.texto.toLowerCase()) != -1) {
          this.listaFiltroTexto.push(f);
        }
      }
    }
  }

  filtrarXcat(id_cat: number) {
    this.seleccionado = id_cat;
    this.listaFiltro = [];
    for (let f of this.lista) {
      if (+f.id_cat === +id_cat) {
        this.listaFiltro.push(f);
      }
    }
    this.texto = "";
    this.listaFiltroTexto = this.listaFiltro;
  }

  listarProductos() {
    this.seleccionado = 0;
    this.productoService.listar().subscribe((data: Producto[]) => {
      this.lista = data;
      this.listaFiltro = this.lista;
      this.listaFiltroTexto = this.listaFiltro;
      this.texto = "";
      setTimeout(() => {
        this.estado = true;
      }, 500)
    });
  }

  agregar(u: Producto) {
    this.aProducto = u;
    let item: ItemCarroCli = {
      id_prod: this.aProducto.id_prod,
      nombre_prod: this.aProducto.nom_prod,
      imagen: this.aProducto.nom_producto,
      base_imp_vent_det: this.aProducto.precio_unit_prod,      
      cantidad: 1
    };
  } 

}
