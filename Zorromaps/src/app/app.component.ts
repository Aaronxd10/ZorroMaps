import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContraOlvidadaComponent } from './contra-olvidada/contra-olvidada.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { EventoComponent } from './evento/evento.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { MapaComponent } from './mapa/mapa.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    ContraOlvidadaComponent,
    CrearCuentaComponent,
    EventoComponent,
    InicioComponent,
    LoginComponent,
    MapaComponent,
    CommonModule,],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private router: Router) { }

  title = 'Zorromaps';
  navegarInicio(){
    this.router.navigate(['/inicio']);

  }
  navegarLogin(){
    this.router.navigate(['/login']);
  }
  navegarRegistrarse(){
    this.router.navigate(['/crear-cuenta']);
  }
  navegarEvento(){
    this.router.navigate(['/evento']);
  }
  navegarMapa(){
    this.router.navigate(['/mapa']);
  }
}
