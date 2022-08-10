import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelo/cliente.module';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };

  @ViewChild("clienteForm") clienteForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;
  @ViewChild("saldo") saldoIpt : ElementRef;

  constructor(
    private clientesSerivicio: ClienteService,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit() {
    this.clientesSerivicio.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;
    if (this.clientes) {
      this.clientes.forEach((cliente) => {
        saldoTotal += Number(cliente.saldo);
      });
    }

    return saldoTotal;
  }

  getNoClientes() {
    return this.clientes?.length
  }

  agregar(f: NgForm) {
    if (!f.valid) {
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      this.clientesSerivicio.agregarCliente(f.value);
      this.clienteForm.resetForm();
      this.cerrarModal()
      this.saldoIpt.nativeElement = 0
    }
  }

  private cerrarModal() {
    this.botonCerrar.nativeElement.click()
  }
}
