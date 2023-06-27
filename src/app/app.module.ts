import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { Routes, RouterModule } from '@angular/router';
//con el comando ng g c y nombre de componente nos crea un componente y se registra automáticamente

//definimos todas las rutas de nuestra aplicacion, por ejemplo, con los componentes la ruta va a ser su 
//nombre y la ruta principal va a ser los clientes
const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    //configuramos las rutas para tenerlas en la aplicacion accesibles
    RouterModule.forRoot(routes)
  ],
  //en los providers importamos los servicios que tengamos
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
