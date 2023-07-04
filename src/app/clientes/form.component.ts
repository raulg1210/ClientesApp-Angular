import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  public cliente:Cliente = new Cliente()
  public titulo:string = "Crear Cliente"

  constructor(private clienteService: ClienteService, private router: Router){}

  ngOnInit() {
    
    
  }

  public create(): void{
    console.log('Clicked!');
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      clientes => {
        this.router.navigate(['/clientes'])
        swal('Nuevo Cliente', `Cliente ${this.cliente.nombre} creado con éxito`, 'success');
      }
    );
  }
}
