import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of cc98237 (Antes de que no se vea el mapa)
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style';
import { CommonModule } from '@angular/common';
import * as OLCesium from 'olcs/OLCesium';
import * as Cesium from 'cesium'; // Import Cesium
=======
import { fromLonLat } from 'ol/proj';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule
>>>>>>> parent of 919a405 (Mapa visible 2D)
<<<<<<< HEAD
=======
import { fromLonLat } from 'ol/proj';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule
>>>>>>> parent of 919a405 (Mapa visible 2D)
=======
import { fromLonLat } from 'ol/proj';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule
>>>>>>> parent of 919a405 (Mapa visible 2D)
=======
>>>>>>> parent of cc98237 (Antes de que no se vea el mapa)

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],  // Incluye CommonModule en las importaciones
  templateUrl: './map.component.html',
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of cc98237 (Antes de que no se vea el mapa)
  styleUrls: ['./map.component.css'],
  imports: [CommonModule],
})
export class MapComponent implements AfterViewInit {
  map!: Map;
  ol3d!: OLCesium;
  sugerencias: string[] = [];
=======
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  private map!: Map;
  sugerencias: any[] = [];  // Ejemplo de sugerencias
>>>>>>> parent of 919a405 (Mapa visible 2D)
<<<<<<< HEAD
=======
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  private map!: Map;
  sugerencias: any[] = [];  // Ejemplo de sugerencias
>>>>>>> parent of 919a405 (Mapa visible 2D)
=======
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  private map!: Map;
  sugerencias: any[] = [];  // Ejemplo de sugerencias
>>>>>>> parent of 919a405 (Mapa visible 2D)
=======
>>>>>>> parent of cc98237 (Antes de que no se vea el mapa)

  lugares = [
    "Salones",
    "Oficinas",
    "Salas Audiovisuales",
    "Auditorio",
    "Cafetería",
    "Baños",
    "Estacionamientos"
  ];
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

  buscarLugares(event: any) {
=======
=======
>>>>>>> parent of 919a405 (Mapa visible 2D)
=======
>>>>>>> parent of 919a405 (Mapa visible 2D)
=======

  buscarLugares(event: any) {
=======
>>>>>>> parent of cc98237 (Antes de que no se vea el mapa)
  
  buscarLugares(event: any){
>>>>>>> parent of 919a405 (Mapa visible 2D)
    const termino = (event.target as HTMLInputElement).value;
    if (termino) {
      this.sugerencias = this.lugares.filter(lugar =>
        lugar.toLowerCase().includes(termino.toLowerCase())
      );
    } else {
      this.sugerencias = [];
    }
  }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of cc98237 (Antes de que no se vea el mapa)
  seleccionarSugerencia(sugerencia: string, input: HTMLInputElement) {
    input.value = sugerencia;
    this.sugerencias = [];
  }

  constructor(private http: HttpClient) {}

  async ngAfterViewInit(): Promise<void> {
=======
  constructor(private http: HttpClient) {}

<<<<<<< HEAD
=======
  constructor(private http: HttpClient) {}

>>>>>>> parent of 919a405 (Mapa visible 2D)
=======
  constructor(private http: HttpClient) {}

>>>>>>> parent of 919a405 (Mapa visible 2D)
=======
>>>>>>> parent of cc98237 (Antes de que no se vea el mapa)
  ngOnInit(): void {
    this.initMap();
    this.loadGeoJSON();
  }

  private initMap(): void {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 919a405 (Mapa visible 2D)
=======
>>>>>>> parent of 919a405 (Mapa visible 2D)
=======
=======
>>>>>>> parent of cc98237 (Antes de que no se vea el mapa)
>>>>>>> parent of 919a405 (Mapa visible 2D)
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2
      })
    });
  }

  private loadGeoJSON(): void {
    this.http.get('assets/data/map.geojson').subscribe((geojson: any) => {
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojson, {
          featureProjection: 'EPSG:3857'
        })
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource
      });

      this.map.addLayer(vectorLayer);
      this.map.getView().fit(vectorSource.getExtent());
    });

    // Initialize OLCesium
    this.ol3d = new OLCesium({ map: this.map });
    const scene = this.ol3d.getCesiumScene();
    scene.terrainProvider = await Cesium.createWorldTerrainAsync();
    this.ol3d.setEnabled(true);
  }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of cc98237 (Antes de que no se vea el mapa)
  setView(lat: number, lng: number, zoom: number): void {
    this.map.setView(new View({
      center: [lng, lat],
      zoom: zoom
    }));
  }

  seleccionarSugerencia(sugerencia: string, input: HTMLInputElement) {
    input.value = sugerencia;
    this.sugerencias = [];
  }
<<<<<<< HEAD
=======
  seleccionarSugerencia(sugerencia: string, input: HTMLInputElement) {
    input.value = sugerencia;
    this.sugerencias = [];
  }
>>>>>>> parent of 919a405 (Mapa visible 2D)
=======
  seleccionarSugerencia(sugerencia: string, input: HTMLInputElement) {
    input.value = sugerencia;
    this.sugerencias = [];
  }
>>>>>>> parent of 919a405 (Mapa visible 2D)
=======
>>>>>>> parent of cc98237 (Antes de que no se vea el mapa)
  
}
