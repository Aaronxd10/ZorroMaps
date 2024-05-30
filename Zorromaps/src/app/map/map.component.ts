import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style';
import { CommonModule } from '@angular/common';
import OLCesium from 'olcs/OLCesium';
import * as Cesium from 'cesium'; // Import Cesium

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [CommonModule],
})
export class MapComponent implements AfterViewInit {
  map!: Map;
  ol3d: any;
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

  buscarLugares(event: any) {
    const termino = (event.target as HTMLInputElement).value;
    if (termino) {
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

  constructor(private http: HttpClient) {}

  async ngAfterViewInit(): Promise<void> {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    this.http.get('assets/data/map.geojson').subscribe((geojson: any) => {
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojson, {
          featureProjection: 'EPSG:3857'
        })
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: this.styleFunction
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

  setView(lat: number, lng: number, zoom: number): void {
    this.map.setView(new View({
      center: [lng, lat],
      zoom: zoom
    }));
  }

  styleFunction(feature: any) {
    const geometryType = feature.getGeometry().getType();
    let style;
    switch (geometryType) {
      case 'Point':
        style = new Style({
          image: new CircleStyle({
            radius: 5,
            fill: new Fill({ color: 'red' }),
            stroke: new Stroke({ color: 'black', width: 1 })
          })
        });
        break;
      case 'LineString':
        style = new Style({
          stroke: new Stroke({
            color: 'blue',
            width: 3
          })
        });
        break;
      case 'Polygon':
        style = new Style({
          stroke: new Stroke({
            color: 'green',
            width: 3
          }),
          fill: new Fill({
            color: 'rgba(0, 255, 0, 0.1)'
          })
        });
        break;
    }
    return style;
  }
}
