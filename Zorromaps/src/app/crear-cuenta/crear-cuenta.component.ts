import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [CommonModule], // Aquí se importa CommonModule
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.css'
})
export class CrearCuentaComponent {
  mostrarTerminosCondiciones: boolean = false;
  constructor(private router: Router) { }

  mostrarTerminos(event: MouseEvent): void {
    event.preventDefault(); // Detener la navegación por defecto
    this.mostrarTerminosCondiciones = true;
  }
  ocultarTerminos(): void {
    this.mostrarTerminosCondiciones = false;
  }
  registrarse(): void {
    // Aquí puedes registrar al usuario
    // Luego de registrar al usuario, puedes redirigirlo a la página de inicio
    this.router.navigate(['/mapa']);
  }
  irALogin(): void {
    // Aquí puedes navegar al componente de inicio de sesión o a la ruta correspondiente
    this.router.navigate(['/login']);
  }
}
