import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  //al constructor le pasamos dos parametros, uno para los encabezados y otro para las rutas con sus clases
  constructor(private http: HttpClient, private router: Router) {}

  //al ser un servicio aqui es donde creamos los metodos, en este caso getClientes nos devuelve los clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get(this.urlEndPoint).pipe(
      //mapeamos para que nos lo convierta a un arreglo de cliente
      map((response) => {
        let clientes = response as Cliente[];
        //retornamos los clientes y en el map pasamos un cliente para ponerle el nombre con mayuscula
        return clientes.map((cliente) => {
          cliente.nombre = cliente.nombre?.toUpperCase();

          //una vez importada la funcion formatDate la usamos y le pasamos la fecha del cliente, el formato y el OK que seria en-US
          /*let datePipe = new DatePipe('es');
          /*cliente.createAt =  datePipe.transform(
            cliente.createAt,
            'EEEE dd, MMMM yyyy'
          );*/
          cliente.createAt = formatDate(
            cliente.createAt,
            'dd-MM-yyyy',
            'en-US'
          );
          //una vez realizado el cambio retornamos el cliente
          return cliente;
        });
      })
    );
  }

  //en el return cogemos el encabezado http y al crearlo ocultamos los datos con post y devolvemos un cliente
  //tipo observable
  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(this.urlEndPoint, cliente, { headers: this.httpHeaders })
      .pipe(
        //mapeamos la respuesta y la ponemos de tipo cliente
        map((response: any) => response.cliente as Cliente),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //añadimos la funcion pipe de observable a la que vamos a manejar los errores con catchError importado
  //anteriormente
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  //creamos el metodo update que retorna un cliente al que le pasamos para modificar la url con el id
  //del cliente para saber cual es, el objeto cliente para modificarlo y las cabeceras para ver
  //las respuestas que da
  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          //comprobamos y si hay un problema lanzamos el error y lo mostramos
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          swal(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}
