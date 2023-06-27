import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  //al ser un servicio aqui es donde creamos los metodos, en este caso getClientes nos devuelve los clientes
  getClientes(): Observable<Cliente[]> {
    return of(CLIENTES);
  }
}
