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
    sessionStorage.clear();
  }
  result: any;

  olvideContrasena(): void {
    // Redirecciona a la página de restablecimiento de contraseña
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
