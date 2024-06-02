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
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from './firestore.service';


@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    ContraOlvidadaComponent,
    //CrearCuentaComponent,
    EventoComponent,
    InicioComponent,
    LoginComponent,
    MapaComponent,
    CommonModule
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private firestore: AngularFirestore, private router: Router, private firestoreService: FirestoreService) {}


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

  addNewDocument() {
    const newDoc = {
      name: 'John Doe',
      age: 30,
      email: 'john.doe@example.com'
    };

    this.firestoreService.addDocument('users', newDoc)
      .then(() => {
        console.log('Document successfully added!');
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  }

}
