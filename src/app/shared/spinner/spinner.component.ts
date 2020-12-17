import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompraService } from 'src/app/services/compra.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor(private empleadoService:EmpleadoService,private router:Router,
              public compraService:CompraService) {    
    empleadoService.verificar();    
  } 

  ngOnInit() {
  }
  

}
