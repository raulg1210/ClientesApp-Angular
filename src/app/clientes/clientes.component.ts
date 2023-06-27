import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {
  clientes: Cliente[] | undefined;

  //
  constructor(private clienteService: ClienteService) { }

  //el método ngOnInit sirve para el arranque de la aplicación si queremos algo, en este caso que el
  //parámetro clientes que es de tipo Cliente sea igual al json CLIENTES importado 
  //con el método subscribe le pasamos un parámetro del observador del service que va a ser clientes y lo
  //pasamos con una función flecha al ser solo una línea de código y se usan paréntesis en la parte de 
  //la izquierda cuando solo hay un parámetro
  //el método nos actualiza asincronamente la lista 
  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }
}
