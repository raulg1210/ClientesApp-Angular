import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
//la clase activatedroute hay que importarla ya que se va a usar para tener la ruta activa
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  public cliente:Cliente = new Cliente()
  public titulo:string = "Crear Cliente"
  public errores:string[] | undefined;

  constructor(private clienteService: ClienteService, private router: Router,
    private activatedRoute: ActivatedRoute){}

  ngOnInit() {
    //llamamos al metodo cargar cliente para cuando accedamos a este nos salgan los datos rellenos
    this.cargarCliente();
  }

  public create(): void{
    console.log('Clicked!');
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal('Nuevo Cliente', `El cliente ${cliente.nombre} creado con éxito`, 'success');
      },
      //una vez creado la constante errores arriba le pasamos un error como funcion lambda en el cual vamos a recoger los errores del backend en la variable creada
      //para ello vamos sacando los atributos de err y lo transformamos en un string
      //mostramos en la consola los errores y el status
      err => {
        this.errores = err.error.errors as string[];
        console.error(err.error.errors);
        console.error('Código de error desde el backend '+ err.status)
      }
    );
  }

  //en el metodo usamos el activated route y obtenemos los parametros
  //le pasamos el id y si existe llamamos a la funcion 
  public cargarCliente(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    })
  }

  //creamos el metodo update al que le pasamos el cliente y suscrubimos los cambios pasandole la ruta clientes
  //y mostramos la alerta con la libreria sweetalert
  public update(): void{
    this.clienteService.update(this.cliente)
      .subscribe(json => {
        this.router.navigate(['/clientes'])
        swal('Cliente Actualizado', `${json.mensaje}: ${json.cliente.mensaje}`, 'success');
      },
      //una vez creado la constante errores arriba le pasamos un error como funcion lambda en el cual vamos a recoger los errores del backend en la variable creada
      //para ello vamos sacando los atributos de err y lo transformamos en un string
      //mostramos en la consola los errores y el status
      err => {
        this.errores = err.error.errors as string[];
        console.error(err.error.errors);
        console.error('Código de error desde el backend '+ err.status)
      }
    )
  }


  

}
