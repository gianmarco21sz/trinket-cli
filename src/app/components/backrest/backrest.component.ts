import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { backrest } from 'src/app/models/backrest';
import { BackrestService } from 'src/app/services/backrest.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-backrest',
  templateUrl: './backrest.component.html',
  styleUrls: ['./backrest.component.scss']
})
export class BackrestComponent implements OnInit {  
  lista : backrest[] = [];
  constructor(private backrestService : BackrestService,              
              private empleadoService : EmpleadoService,
              private router : Router) { }

  ngOnInit(): void {    
    this.listarBackup();
  }

  

  agregar(){
      let fecha  = new Date().toLocaleString().replace("/","-").replace("/","-").replace(",","").replace(":","").replace(":","").replace(" ","-");      
      let f2 = new Date();
      let nombre = fecha+"-"+f2.getMilliseconds();
      let backup : backrest ={
        id: 0,
        nombre : nombre,
        estado : 1
      }
      this.backrestService.agregar(backup).subscribe((data:backrest)=>{
        this.listarBackup();        
      });
      
  }

  listarBackup(){
    this.backrestService.listar().subscribe((data:backrest[])=>{
      this.lista = data;
    });
  }

  restaurar(backup : backrest){
    this.backrestService.restaurar(backup).subscribe((data:string)=>{      
    },err=>{
      alert("Sistema Restaurado, se cerrar sesion");
      this.empleadoService.cambiar();
      this.router.navigate(['login']);
    });
  }

  eliminar(id : number){
    this.backrestService.eliminar(id).subscribe((data:boolean)=>{
      if(data===true){
        alert("eliminado correctamente");
        this.listarBackup();
      }else{
        alert("error al eliminar");
        this.listarBackup();
      }
    });
  }

}
