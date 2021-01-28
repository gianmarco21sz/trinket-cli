import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {  

  clientes:string = "";
  ingresos : string = "";
  ventas : string = "";

  barChartDataVentas = [];

  barChartLabelsVentas = [];

  barChartDataProductos = [];

  barChartLabelsProductos = [];

  barChartOptions = {
    scales: {
      xAxes: [{
        ticks: {
            min: 0,
            stepSize: 1
        }
      }],
      yAxes: [{
        ticks: {          
          stepSize: 1,
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  barChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ]
    }
  ]; 
   


  constructor(private reportesService:ReportesService,
              private router:Router,
              private empleadoService:EmpleadoService) {    
    this.tarjetas();
    this.graficos();
  }

  ngOnInit() {   
    if(this.empleadoService.empleadolog.nombre_rol === 'Vendedor'){
      this.router.navigateByUrl('menu/(opt:ventas)');
    }else if(this.empleadoService.empleadolog.nombre_rol === 'Comprador'){
      this.router.navigateByUrl('menu/(opt:listaCompras)');
    }
  }

  graficos(){
    combineLatest([
      this.reportesService.ventasPorMes(),
      this.reportesService.productosVendidos()
    ]).subscribe(([ventas,productos])=>{
      //ventas
      let arregloVentas = [];
      for(let item of ventas){
        this.barChartLabelsVentas.push(item.mes);
        arregloVentas.push(item.cantidad);
      }
      this.barChartDataVentas = [{
        label: '# de Ventas',
        data: arregloVentas,
        borderWidth: 1,
        fill: false
      }];

      // producto
      let arregloProducto = [];
      for(let item of productos){
        this.barChartLabelsProductos.push(item.nom_prod);
        arregloProducto.push(item.cantidad);
      }
      this.barChartDataProductos = [{
        label: '# de Productos',
        data: arregloProducto,
        borderWidth: 1,
        fill: false
      }];
    });
    
  }

  tarjetas(){
    combineLatest([
      this.reportesService.clientesRegistrados(),
      this.reportesService.ingresosMes(),
      this.reportesService.ventasRealizadas()
    ]).subscribe(([clientes,ingresos,ventas])=>{
      this.clientes = clientes[0].clientes;
      this.ingresos = ingresos[0].ingresos;
      this.ventas = ventas[0].ventas;
    });
  }
}
