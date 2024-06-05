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
      this.addMarkers();
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

  agregarMarcadores() {
    const marcadores: { name: string, coordinates: [number, number] }[] = [
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
    { name: "Sala Audiovisual 3", coordinates: [-100.40434376905252, 20.593775720251145] }
    ];

    marcadores.forEach(marcador => {
      new mapboxgl.Marker()
        .setLngLat(marcador.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${marcador.name}</h3>`)) // Aquí está el cambio
        .addTo(this.map!);
    });
  }


  addMarkers() {
    new mapboxgl.Marker({ color: 'green' })
      .setLngLat([-100.405979, 20.593216])
      .setPopup(new mapboxgl.Popup().setHTML("<h3>Inicio</h3>"))
      .addTo(this.map!);

    const redMarker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat([-100.405134, 20.595314])
      .setPopup(new mapboxgl.Popup().setHTML("<h3>Fin</h3>"))
      .addTo(this.map!);

    // Agrega un evento de clic al marcador rojo
    redMarker.getElement().addEventListener('click', () => {
      // Verifica si la ruta ya está presente en el mapa
      if (this.map!.getSource('ruta')) {
        // Si la ruta existe, elimínala
        this.map!.removeLayer('ruta');
        this.map!.removeSource('ruta');
      } else {
        // Si la ruta no existe, calcula y muestra la ruta
        this.calcularRuta();
      }
    });
  }



  calcularRuta() {
    // Comprueba si ya existe una fuente de ruta y elimínala
    if (this.map!.getSource('ruta')) {
      this.map!.removeLayer('ruta');
      this.map!.removeSource('ruta');
    }
    // Agrega una línea de ruta (ejemplo simple)
    this.map!.addSource('ruta', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [-100.405979, 20.593216],
            [-100.405079, 20.594878], // Punto intermedio
            [-100.405134, 20.595314]
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
        'line-color': '#0000ff',
        'line-width': 4
      }
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

