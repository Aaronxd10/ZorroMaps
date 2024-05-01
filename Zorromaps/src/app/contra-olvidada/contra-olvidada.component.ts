import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contra-olvidada',
  standalone: true,
  imports: [CommonModule], // Aquí se importa CommonModule
  templateUrl: './contra-olvidada.component.html',
  styleUrl: './contra-olvidada.component.css'
})
export class ContraOlvidadaComponent {
  mostrarMensaje: boolean = false;

  mostrarCuadro(): void {
    this.mostrarMensaje = true;
  }

  ocultarCuadro(): void {
    this.mostrarMensaje = false;
  }

}
