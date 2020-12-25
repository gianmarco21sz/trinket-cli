import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
declare var Swal : any;

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent implements OnInit {
  forma : FormGroup;
  estado : boolean = true;
  constructor(private empleadoService:EmpleadoService,
              private fb : FormBuilder,
              private router : Router) {
    this.empleadoService.verificarLogin();
    this.crearFormulario();
   }

  ngOnInit(): void {
  }

  get emailNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }

  crearFormulario() {
    this.forma = this.fb.group({      
      email  : ['', [ Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')] ],      
    });
  }

  enviar(){
    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }        
      });     
    }else{
      this.empleadoService.validarCorreo(this.forma.get('email').value).subscribe((data:boolean)=>{
        if(data===true){
          this.estado = false;
          this.empleadoService.enviarCorreoRecuperar(this.forma.get('email').value).subscribe(data=>{
            this.estado = true;
            Swal.fire({
              title: 'Mensaje Enviado',
              text: "Se envio mensaje al correo indicado",
              icon: 'success',          
              confirmButtonText: 'OK',
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {              
                this.router.navigateByUrl('/login');     
              }
            });       
          });
        }else{
          Swal.fire(
            'Error',
            'No se encontro el email indicado',
            'error'
          )
        }
      });
    }
  }

}
