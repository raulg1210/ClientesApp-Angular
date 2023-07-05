import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {
  clientes!: Cliente[];

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

  //creamos el metodo delete en el formulario ya que va a ser como un eventi del mismo
  //al metodo le pasamos un cliente y usamos la libreria sweet alert para dar estilos
  //despues pasamos el resultado y si tiene valor eliminamos al cliente y volvemos a mostrar la lista
  //sin el cliente eliminado y mostramos un feedback
  delete(cliente: Cliente): void{
    swal({
      title: `¿Estás seguro de eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      text: 'No se podrá revertir',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3045d6',
      confirmButtonText: 'Sí, deseo eliminarlo',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if(result.value){
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes?.filter(cli => cli !== cliente)
            swal(
              'Eliminado',
              `El cliente ${cliente.nombre} ${cliente.apellido} ha sido eliminado`,
              'success'
            )
          }
        )
      } 
    })
  }

}
