import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompraService } from 'src/app/services/compra.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private empleadoService:EmpleadoService,private router:Router,
              public compraService:CompraService) {    
    empleadoService.verificar();    
  } 

  ngOnInit() {
  }
  

}
