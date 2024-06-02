import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',
  
})
export class MapaComponent {

  constructor(private router: Router, private authService: AuthenticateService){}

  sugerencias: string[] = [];

  lugares = [
    "Salones",
    "Oficinas",
    "Salas Audiovisuales",
    "Auditorio",
    "Cafetería",
    "Baños",
    "Estacionamientos"
  ];

  @ViewChild('busquedaInput') busquedaInput!: ElementRef<HTMLInputElement>;

  buscarLugares(event: any){
    const termino = (event.target as HTMLInputElement).value;
    if(termino){
      this.sugerencias = this.lugares.filter(lugar =>
        lugar.toLowerCase().includes(termino.toLowerCase())
      );
    } else {
      this.sugerencias = [];
    }
  }

  seleccionarSugerencia(sugerencia: string, input: HTMLInputElement) {
    input.value = sugerencia;
    this.sugerencias = [];
  }
  
  logout(){
    this.authService.logout();
    this.router.navigate(['inicio']);
  }

}
