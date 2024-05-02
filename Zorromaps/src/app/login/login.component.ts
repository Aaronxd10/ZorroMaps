import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {
  }

  olvideContrasena(event:Event): void {
    // Redirecciona a la página de restablecimiento de contraseña
    event.preventDefault(); // Detener la acción por defecto del enlace
    this.router.navigate(['/contra-olvidada']);
  }
  iniciarSesion(): void {
    // Redirige a la pantalla de mapa
    this.router.navigate(['/mapa']);
  }
  registrarse(): void {
    // Redirecciona a la página de registro
    this.router.navigate(['/crear-cuenta']);
  }
}
