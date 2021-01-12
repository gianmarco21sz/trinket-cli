import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Venta } from 'src/app/models/venta';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UtilsService } from 'src/app/services/utils.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  estado : boolean = false;
  lista : Venta[] = [];
  listaFiltro : Venta[] = [];
  fecha : Date;
  actual = new Date();  
  actualString : string = this.actual.getFullYear()+'-'+this.actual.getMonth()+1+'-'+this.actual.getDate();
  constructor(private ventasService : VentasService,
              private utilsService : UtilsService,
              private empleadoService : EmpleadoService,
              private router : Router) { 
    this.listarVentas();    
  }

  ngOnInit(): void {
    if(this.empleadoService.empleadolog.nombre_rol === 'Comprador'){
      this.router.navigateByUrl('menu/(opt:listaCompras)');
    }
  }

  filtraFecha(){    
    this.listaFiltro = [];
    for(let com of this.lista){            
      if(this.fecha.toString() == com.fecha_vent_cab.toString().substring(0,10)){       
        this.listaFiltro.push(com);
      }
    }    
    this.utilsService.cargarDataTable('#tablaVentas');    
  }

  listarVentas(){
    this.ventasService.listar().subscribe((data:Venta[])=>{
      this.lista = data;
      this.listaFiltro = this.lista;
      this.estado = true;
    });
    this.utilsService.cargarDataTable('#tablaVentas');
  }

}
