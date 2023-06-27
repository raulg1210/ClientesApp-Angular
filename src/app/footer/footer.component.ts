import { Component } from "@angular/core";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  //any es un tipo genérico y public es el tipo del método
  public autor: any = {nombre:'Raúl', apellido: 'García'}
}
