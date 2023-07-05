import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'})

  constructor(private http:HttpClient) { }

  //al ser un servicio aqui es donde creamos los metodos, en este caso getClientes nos devuelve los clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
  }

  //en el return cogemos el encabezado http y al crearlo ocultamos los datos con post y devolvemos un cliente
  //tipo observable
  create(cliente: Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders})
  }

  getCliente(id: number) : Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
  }

  //creamos el metodo update que retorna un cliente al que le pasamos para modificar la url con el id
  //del cliente para saber cual es, el objeto cliente para modificarlo y las cabeceras para ver
  //las respuestas que da
  update(cliente: Cliente) : Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders})
  }


  delete(id: number) : Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }

}
