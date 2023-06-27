import { Cliente } from "./cliente";

//creamos una variable constante que se pueda exportar ya que es un json y lo usaremos en otros sitios
export const CLIENTES: Cliente[] = [
  {id: 1, nombre: 'Raúl', apellido: 'García', email: 'raul@gmail.com', createAt: '2023-06-26'},
  {id: 2, nombre: 'Juan', apellido: 'Rodriguez', email: 'juan@gmail.com', createAt: '2023-06-26'},
  {id: 3, nombre: 'Luis', apellido: 'García', email: 'luis@gmail.com', createAt: '2023-06-26'},
  {id: 4, nombre: 'Manu', apellido: 'Rodriguez', email: 'manu@gmail.com', createAt: '2023-06-26'},
  {id: 5, nombre: 'Dani', apellido: 'García', email: 'dani@gmail.com', createAt: '2023-06-26'},
  {id: 6, nombre: 'Miguel', apellido: 'Rodriguez', email: 'migui@gmail.com', createAt: '2023-06-26'},
  {id: 7, nombre: 'Carlos', apellido: 'García', email: 'carlos@gmail.com', createAt: '2023-06-26'},
]