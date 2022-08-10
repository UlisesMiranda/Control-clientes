import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelo/cliente.module';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };

  id: string

  constructor(
    private clientesSerivicio: ClienteService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientesSerivicio.getCliente(this.id).subscribe(
      cliente => this.cliente = cliente,
      )
    }

  guardar(f : NgForm){
    if (!f.valid) {
      this.flashMessages.show("Por favor llena el formulario correctamente",{
        cssClass: 'alert-danger',
        timeout: 4000,
      })
    }
    else {
      f.value.id = this.id
      this.clientesSerivicio.modificarCliente(f.value)
      this.router.navigate(['/'])
    }

  }

  eliminar(){
    if(confirm("¿Seguro que quieres eliminar al cliente?")) {
      this.clientesSerivicio.eliminarCliente(this.cliente)
      this.router.navigate(['/'])
    }
  }

}
