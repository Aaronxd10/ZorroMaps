import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { EventoComponent } from './evento/evento.component';
import { InicioComponent } from './inicio/inicio.component';
import { ContraOlvidadaComponent } from './contra-olvidada/contra-olvidada.component';
import { MapaComponent } from './mapa/mapa.component';

export const routes: Routes = [

  {path: 'inicio', component: InicioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'crear-cuenta', component: CrearCuentaComponent},
  {path: 'evento', component: EventoComponent},
  {path: 'contra-olvidada', component: ContraOlvidadaComponent},
  {path: 'mapa', component: MapaComponent},
  {path: '', redirectTo: '/inicio', pathMatch: 'full'}];
