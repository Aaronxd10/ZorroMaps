import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent {

  constructor(private router: Router) { }

  iniciarSesion(): void {
    // Redirige a la pantalla del mapa
    this.router.navigate(['/mapa']);
  }

}
