import { Component } from '@angular/core';
import{Router} from '@angular/router';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  constructor(private router: Router) { }

  navegarLogin(){
    this.router.navigate(['/login']);
  }
  navegarRegistrarse(){
    this.router.navigate(['/crear-cuenta']);
  }
  navegarEvento(){
    this.router.navigate(['/evento']);
  }
  }
