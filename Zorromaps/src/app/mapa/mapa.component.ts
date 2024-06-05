import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
import * as mapboxgl from 'mapbox-gl';
import { MAPBOX_ACCESS_TOKEN } from '../mapa/mapa.config'; // Ajusta la ruta si es necesario


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
  map: mapboxgl.Map | null = null;  // Inicialización de la propiedad

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: 'map', // ID del contenedor en tu HTML
      style: 'mapbox://styles/19141218/clwile9wp01gk01qo11vu2y9f', // Estilo del mapa
      center: [-100.404873, 20.593692], // Coordenadas del Instituto Tecnológico de Querétaro
      zoom: 17,
      pitch: 50,
      accessToken: MAPBOX_ACCESS_TOKEN // Configura el token de acceso aquí
    });
  }



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

