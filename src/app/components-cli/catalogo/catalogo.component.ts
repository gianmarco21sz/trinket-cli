import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Cliente } from 'src/app/models/cliente';
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
import { TipoDocIdentidadService } from 'src/app/services/tipo-doc-identidad.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ViaService } from 'src/app/services/via.service';
import { ZonaService } from 'src/app/services/zona.service';
declare var $ : any;
declare var Swal : any;

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {  
  listaTipoDoc : tipoDocIdentidad[] = [];
  listaVia : Via[] = [];
  listaZona : Zona[] = []; 
  show : boolean = false;
  show2 : boolean = false;  
  isblock : boolean = true;
  rod : boolean = true;
  forma : FormGroup;
  formaR : FormGroup;
  cliente : Cliente;
  siteKey : string = "6LcqOCkaAAAAAGkNRmX4mz3IUb4KudQ94Sqp5tBw";

  constructor(private productoService: ProductoService,
    public compraService: CompraService,
    private categoriaService: CategoriaService,
    public utilsService:UtilsService,
    public empleadoService : EmpleadoService,
    public clienteService : ClienteService,
    public router : Router,
    private fb:FormBuilder,
    private titleService:Title,
    private viaService:ViaService,
    private zonaService:ZonaService,
    private tipodocService : TipoDocIdentidadService) {
      this.titleService.setTitle("Trinket Cloud Sales");
     }

  ngOnInit(): void {    
    this.crearFormulario();  
    this.crearFormularioRegistro();  
    this.cargarCombos();
  }

  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }
  get passNoValido() {
    return this.forma.get('pass').invalid && this.forma.get('pass').touched
  }

  get usuarioRNoValido() {
    return this.formaR.get('usuario').invalid && this.formaR.get('usuario').touched
  }
  get passRNoValido() {
    return this.formaR.get('pass').invalid && this.formaR.get('pass').touched
  }
  get tipoNoValido() {
    return this.formaR.get('tipo_doc').invalid && this.formaR.get('tipo_doc').touched
  }
  get rucNoValido() {
    return this.formaR.get('num_doc_ruc').invalid && this.formaR.get('num_doc_ruc').touched
  }
  get dniNoValido() {
    return this.formaR.get('num_doc_dni').invalid && this.formaR.get('num_doc_dni').touched
  }
  get correoNoValido() {
    return this.formaR.get('correo').invalid && this.formaR.get('correo').touched
  }
  get distritoNoValido() {
    return this.formaR.get('distrito').invalid && this.formaR.get('distrito').touched
  }
  get zonaNoValido() {
    return this.formaR.get('zona').invalid && this.formaR.get('zona').touched
  }
  get viaNoValido() {
    return this.formaR.get('via').invalid && this.formaR.get('via').touched
  }
  get referenciaNoValido() {
    return this.formaR.get('referencia').invalid && this.formaR.get('referencia').touched
  }
  get telefonoNoValido() {
    return this.formaR.get('telefono').invalid && this.formaR.get('telefono').touched
  }
  get nombreNoValido() {
    return this.formaR.get('nombre').invalid && this.formaR.get('nombre').touched
  }
  get direccionNoValido() {
    return this.formaR.get('direccion').invalid && this.formaR.get('direccion').touched
  }

  get captchaNoValido() {
    return this.forma.get('recaptcha').invalid && this.forma.get('recaptcha').touched
  }  


  crearFormulario() {
    this.forma = this.fb.group({      
      usuario  : ['', [ Validators.required]],
      pass : ['',Validators.required],
      recaptcha: ['', Validators.required]
    });   
  }

  cargarCombos(){
    this.tipodocService.listar().subscribe((data:tipoDocIdentidad[])=>{
      this.listaTipoDoc = data;
    });
    this.zonaService.listar().subscribe((data:Zona[])=>{
      this.listaZona = data;
    });
    this.viaService.listar().subscribe((data:Via[])=>{      
      this.listaVia = data;
    });    
  }

  cambiar(){
    this.rod = !this.rod;
  }

  crearFormularioRegistro(){
    this.formaR = this.fb.group({
      tipo_doc  : ['', [ Validators.required]],
      num_doc_ruc : ['',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(11),Validators.maxLength(11)],],      
      num_doc_dni : ['',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(8),Validators.maxLength(8)],],
      correo  : ['', [ Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')] ],
      distrito  : ['', [ Validators.required]],
      zona  : ['', [ Validators.required]],
      via  : ['', [ Validators.required]],
      referencia  : ['', [ Validators.required]],
      telefono  : ['',[Validators.required,Validators.maxLength(9)],],
      nombre  : ['', [ Validators.required]],
      direccion  : ['', [ Validators.required]],
      usuario  : ['', [ Validators.required]],
      pass : ['',Validators.required]
    });
  }

  soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
        e.preventDefault();
    }
  }

  irCompras(){
    if(this.clienteService.clientelog){
      this.router.navigateByUrl('catalogo/(cli:pedido)')
    }else{
      alert('Primero debe logearse');
    }
  }
  
  limpiar(){
    this.formaR.reset();
  } 
  
  
  ocultar(as: number) {
    if (as === 1) {
      this.isblock = !this.isblock;
    }
  }
  
  salir(){
    this.clienteService.salir();
  }

  login(){
    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }        
      });     
    }else{
      this.clienteService.autenticacion(this.forma.get('usuario').value,this.forma.get('pass').value)
      .subscribe((data:Cliente)=>{
        if(data!== null){
          this.clienteService.clientelog = data;
          this.clienteService.guardarLocal();
          $("#login .btn-close").click();
        }else{
          Swal.fire(
            "Error",
            "Usuario o contraseña incorrecto",
            "error"
          )
        }
      });
    }
  }

  llenarCliente(){
    this.cliente = {
      
    }
  }

  registrar(){
    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }        
      });     
    }else{

    }
  }
}
