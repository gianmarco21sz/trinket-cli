import { Component, OnInit } from '@angular/core';
import { Venta } from 'src/app/models/venta';
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
  constructor(private ventasService : VentasService,
              private utilsService : UtilsService) { 
    this.listarVentas();
    this.utilsService.cargarDataTable('#tablaVentas');
  }

  ngOnInit(): void {
  }

  listarVentas(){
    this.ventasService.listar().subscribe((data:Venta[])=>{
      this.lista = data;
      this.estado = true;
    });
  }

}
