import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Compra } from 'src/app/models/compra';
import { ItemCarro } from 'src/app/models/itemCarro';
import { CompraService } from 'src/app/services/compra.service';
declare var Swal : any;

@Component({
  selector: 'app-edit-compras',
  templateUrl: './edit-compras.component.html',
  styleUrls: ['./edit-compras.component.scss']
})
export class EditComprasComponent implements OnInit {
  listaDetalle : ItemCarro[] = [];
  nuevaCompra : FormGroup;
  estado : boolean = false;
  public eCompra : Compra ;
  constructor(private compraService:CompraService,
              private fb:FormBuilder,
              private route:ActivatedRoute,
              private router:Router) {
    this.crearFormulario();
    this.cargarCompra();    
  }

  ngOnInit(): void {
    
  }

  get condicionInvalida(){
    return this.nuevaCompra.get('cond_env').invalid && this.nuevaCompra.get('cond_env').touched
  }

  crearFormulario(){
    this.nuevaCompra = this.fb.group({
      cond_env : ['',Validators.required,]      
    });
  }

  aumentar(prod:ItemCarro){    
    if(+prod.cant_ord_det === 0 || +prod.cant_ord_det === null){
      prod.cant_ord_det=1;
    }
    this.compraService.aumentar(+prod.prod_id,prod.cant_ord_det);
  }

  eliminar(id : number,producto:string){
    Swal.fire({
      title: 'Confirme acción',
      text: 'Seguro de eliminar del detalle el producto "'+producto+'"?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText : 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.compraService.delDetalle(id).subscribe((data:boolean)=>{
          if(data === true){
            Swal.fire(
              'Eliminado!',
              'Detalle eliminado satisfactoriamente!',
              'success'
            )
            this.cargarCompra();
          }else{
            Swal.fire(
              'Error!',
              'Se produjo un error al tratar de eliminar el detalle de la compra',
              'danger'
            )
            this.cargarCompra();
          }
        });
      }
    });
  }

  cargarCompra(){
    let params = this.route.snapshot.params;
    if(params){
      this.compraService.buscarCompra(params.id).subscribe((compra:Compra[])=>{        
        this.eCompra = compra[0];    
        console.log(this.eCompra);    
        this.nuevaCompra.reset({
          cond_env : compra[0].cond_env_cab
        });
        this.compraService.buscarDetalleCompra(params.id).subscribe((detalle:ItemCarro[])=>{
          console.log(detalle);
          this.listaDetalle = detalle;          
          this.estado = true;
        });
      });
    }
  }

  actualizar(){
    if ( this.nuevaCompra.invalid ) {      
      return Object.values( this.nuevaCompra.controls ).forEach( control => {        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );          
        } else {
          control.markAsTouched();          
        }          
      });          
    }else{
      this.compraService.upCompraCondicion(+this.eCompra.id_ord_comp_cab,this.nuevaCompra.get('cond_env').value)
      .subscribe((data:boolean)=>{
        for(let det of this.listaDetalle){
          this.compraService.upDetalleCantidad(+det.ord_comp_det,+det.cant_ord_det)
          .subscribe((data:boolean)=>{            
          });
        }
        this.router.navigateByUrl('/menu/(opt:listaCompras)');
      });
    }
  }

}
