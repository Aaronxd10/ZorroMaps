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


  ngOnInit(): void {
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
      this.agregarMarcadores();
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
  marcadores: { name: string, coordinates: [number, number] }[] = [
    { name: "Direccion", coordinates: [-100.40552259718322, 20.593618079982686] },
    { name: "Servicios Escolares", coordinates: [-100.40540409851523, 20.593351708226223] },
    { name: "Cancha", coordinates: [-100.40581469542131, 20.594908065032868] },
    { name: "Centro De Informacion", coordinates: [-100.4051567928475, 20.59292712590462] },
    { name: "Centro de Copiado", coordinates: [-100.40522237138502, 20.593186511881363] },
    { name: "Cafeteria", coordinates: [-100.40535245821307, 20.59398118359892] },
    { name: "Auditorio", coordinates: [-100.4059640024669, 20.594140620238107] },
    { name: "Centro de Idiomas", coordinates: [-100.4043506538542, 20.593092353546716] },
    { name: "Laboratorio de Quimica", coordinates: [-100.40469074917935, 20.592944184529394] },
    { name: "Edificio F", coordinates: [-100.40480931069172, 20.593824258328585] },
    { name: "Edificio B", coordinates: [-100.40456388841513, 20.593717548136244] },
    { name: "Edificio C", coordinates: [-100.40462705781555, 20.59345107234265] },
    { name: "Edificio G", coordinates: [-100.40470487143143, 20.594110864419093] },
    { name: "Laboratorio de Matematicas", coordinates: [-100.40427407821244, 20.594054913624632] },
    { name: "Edificio J", coordinates: [-100.40568035769766,20.594652418585216] },
    { name: "Division de Estudios Profesionales", coordinates: [-100.40545142862305, 20.59446451062098] },
    { name: "Edificio I", coordinates: [-100.40488956208807, 20.594804422018946] },
    { name: "Laboratorio de Electronica", coordinates: [-100.40499778557738, 20.595067274250745] },
    { name: "Alberca", coordinates: [-100.40531368313798, 20.5949960853072] },
    { name: "Laboratorio de Ingenieria Industrial", coordinates: [-100.40450492859108, 20.59484275458468] },
    { name: "Centro de Computo", coordinates: [-100.40519522135426, 20.595490299684798] },
    { name: "Edificio K", coordinates: [-100.40466330571326, 20.59541822747681] },
    { name: "Edificio X", coordinates: [-100.40463767551115, 20.595209011578216] },
    { name: "Edificio H", coordinates: [-100.40471366043532, 20.594369946665356] },
    { name: "Sala Audiovisual 2", coordinates: [-100.40447218034348, 20.594445547425384] },
    { name: "Sala Audiovisual 3", coordinates: [-100.40434376905252, 20.593775720251145] },

    ];

  agregarMarcadores() {
    new mapboxgl.Marker({ color: 'green' })
    .setLngLat([-100.405979, 20.593216])
    .setPopup(new mapboxgl.Popup().setHTML("<h3>Inicio</h3>"))
    .addTo(this.map!);

    this.marcadores.forEach(marcador => {
    const marker = new mapboxgl.Marker()
      .setLngLat(marcador.coordinates)
      .setPopup(new mapboxgl.Popup().setHTML(`<h3>${marcador.name}</h3>`))
      .addTo(this.map!);

    // Agregar un evento de clic a cada marcador
    marker.getElement().addEventListener('click', () => {
      this.calcularRuta(marcador.coordinates); // Llama a la función calcularRuta con las coordenadas del marcador clickeado
    });
  });

  }

  calcularRuta(destino: [number, number] | string) {
    const origen: [number, number] = [-100.405979, 20.593216]; // Coordenadas del punto de inicio

    let destinoCoords: [number, number];

    if (typeof destino === 'string') {
      // Buscar el marcador por nombre
      const marcador = this.marcadores.find(m => m.name === destino);
      if (marcador) {
        destinoCoords = marcador.coordinates;
      } else {
        console.error('Lugar no encontrado');
        return;
      }
    } else {
      destinoCoords = destino;
    }

    // Comprueba si ya existe una fuente de ruta y elimínala
    if (this.map!.getSource('ruta')) {
      this.map!.removeLayer('ruta');
      this.map!.removeSource('ruta');
    }

    // Agrega una línea de ruta desde el origen hasta el destino
    this.map!.addSource('ruta', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            origen,
            destinoCoords
          ]
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


