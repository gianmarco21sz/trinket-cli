import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  lista : Cliente[]=[];
  estado : boolean = false;
  constructor(public router:Router,
              private clienteService:ClienteService,
              private utilsService : UtilsService) { }

  ngOnInit(): void {
    this.listarClientes();
    this.utilsService.cargarDataTable('#tablaCliente');
  }

  listarClientes(){
    this.clienteService.listar().subscribe((data:Cliente[])=>{
      this.lista = data;
      this.estado = true;
    });
  }

  editar(id : number){
    this.router.navigateByUrl(`/menu/(opt:upCliente/${id})`);
  }

  eliminar(id:number,nombre:string){

  }

}
