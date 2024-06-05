import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
import * as mapboxgl from 'mapbox-gl';
import { MAPBOX_ACCESS_TOKEN } from '../mapa/mapa.config'; // Ajusta la ruta si es necesario
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Importa AngularFireDatabase


@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',

})
export class MapaComponent {


  constructor(private router: Router, private authService: AuthenticateService, private db: AngularFireDatabase){}

  sugerencias: string[] = [];
  map: mapboxgl.Map | null = null;  // Inicialización de la propiedad
  marcadores: {
    name: string,
    coordinates: [number, number],
    intermediatePoints?: [number, number][],
    steps?: string[]
  }[] = [];

  ngOnInit(): void {
    // Inicializa el mapa
    this.map = new mapboxgl.Map({
      container: 'map', // ID del contenedor en tu HTML
      style: 'mapbox://styles/19141218/clwile9wp01gk01qo11vu2y9f', // Estilo del mapa
      center: [-100.405556, 20.594555], // Ajusta el centro del mapa
      zoom: 17,
      pitch: 50,
      accessToken: MAPBOX_ACCESS_TOKEN // Configura el token de acceso aquí
    });

    this.map.on('load', () => {
      this.defineZone();
      this.db.list('/marcadores').valueChanges().subscribe((data: any) => {
        this.marcadores = data;
        this.agregarMarcadores();
      });
    });
  }

  defineZone() {
    this.map!.addSource('zona', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [-100.406787, 20.595406],
            [-100.404548, 20.595660],
            [-100.403551, 20.593274],
            [-100.405609, 20.592403],
            [-100.406787, 20.595406] // Cerrar el polígono
          ]]
        },
        properties: {} // Agrega un objeto de propiedades vacío
      }
    });

    this.map!.addLayer({
      id: 'zona',
      type: 'fill',
      source: 'zona',
      layout: {},
      paint: {
        'fill-color': '#00008B',
        'fill-opacity': 0.3 // Cambia la opacidad a 0.3 para que sea menos intenso
      }
    });
  }

  agregarMarcadores() {
    // Marcador de inicio
    new mapboxgl.Marker({ color: 'green' })
      .setLngLat([-100.405979, 20.593216])
      .setPopup(new mapboxgl.Popup().setHTML("<h3>Inicio</h3>"))
      .addTo(this.map!);

    // Agregar puntos intermedios como marcadores
    this.marcadores.forEach(marcador => {
      const marker = new mapboxgl.Marker()
        .setLngLat(marcador.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${marcador.name}</h3>`))
        .addTo(this.map!);

      // Agregar un evento de clic a cada marcador
      marker.getElement().addEventListener('click', () => {
        this.calcularRuta(marcador.coordinates, marcador.intermediatePoints); // Llama a la función calcularRuta con las coordenadas del marcador clickeado y los puntos intermedios
      });
    });
  }

  calcularRuta(destino: [number, number] | string, puntosIntermedios?: ([number, number])[]) {
    const origen: [number, number] = [-100.405979, 20.593216]; // Coordenadas del punto de inicio

    let destinoCoords: [number, number];
    let puntosIntermediosRuta: [number, number][] = [];

    // Determinar las coordenadas del destino
    if (typeof destino === 'string') {
        // Buscar el marcador por nombre
        const marcadorDestino = this.marcadores.find(m => m.name === destino);
        if (marcadorDestino) {
            destinoCoords = marcadorDestino.coordinates;
        } else {
            console.error('Destino no encontrado');
            return;
        }
    } else {
        destinoCoords = destino;
    }

    // Determinar las coordenadas de los puntos intermedios
    if (puntosIntermedios && puntosIntermedios.length > 0) {
        puntosIntermedios.forEach(punto => {
            if (typeof punto === 'string') {
                // Buscar el marcador por nombre
                const marcadorPunto = this.marcadores.find(m => m.name === punto);
                if (marcadorPunto) {
                    puntosIntermediosRuta.push(marcadorPunto.coordinates);
                } else {
                    console.error(`Punto intermedio '${punto}' no encontrado`);
                }
            } else {
                puntosIntermediosRuta.push(punto);
            }
        });
    }

    // Combinar origen, puntos intermedios y destino para obtener la ruta completa
    const rutaCoordinates = [origen, ...puntosIntermediosRuta, destinoCoords];

    // Mostrar información de depuración
    console.log('Origen:', origen);
    console.log('Destino:', destinoCoords);
    console.log('Puntos intermedios:', puntosIntermediosRuta);

    // Comprueba si ya existe una fuente de ruta y elimínala
    if (this.map!.getSource('ruta')) {
        this.map!.removeLayer('ruta');
        this.map!.removeSource('ruta');
    }

    // Agrega una línea de ruta desde el origen hasta el destino, pasando por los puntos intermedios
    this.map!.addSource('ruta', {
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: rutaCoordinates
            },
            properties: {} // Agrega un objeto de propiedades vacío
        }
    });

    this.map!.addLayer({
        id: 'ruta',
        type: 'line',
        source: 'ruta',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#00008b', // Azul oscuro
            'line-width': 4
        }
    });
}


  @ViewChild('busquedaInput') busquedaInput!: ElementRef<HTMLInputElement>;

  buscar() {
    const termino = this.busquedaInput.nativeElement.value;
    if (termino) {
      const marcador = this.marcadores.find(m => m.name.toLowerCase() === termino.toLowerCase());
      if (marcador) {
        this.calcularRuta(marcador.coordinates);
      } else {
        console.error('Lugar no encontrado');
      }
    } else {
      console.error('Por favor, introduzca un término de búsqueda');
    }
  }

  buscarLugares(event: any) {
    const termino = (event.target as HTMLInputElement).value;
    if (termino) {
      this.sugerencias = this.marcadores
        .filter(marcador => marcador.name.toLowerCase().includes(termino.toLowerCase()))
        .map(marcador => marcador.name);
    } else {
      this.sugerencias = [];
    }
  }

  seleccionarSugerencia(sugerencia: string, input: HTMLInputElement) {
    input.value = sugerencia;
    this.sugerencias = [];
    const marcadorSeleccionado = this.marcadores.find(marcador => marcador.name === sugerencia);
    if (marcadorSeleccionado) {
      this.calcularRuta(marcadorSeleccionado.coordinates);
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['inicio']);
  }
}


