import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { SheetMarker } from '../services/dataService';

interface MapViewProps {
  markers: SheetMarker[];
  selectedMarkerId: string | null;
  onMarkerClick: (marker: SheetMarker) => void;
  isLoading: boolean;
}

// Ruta actualizada para apuntar dentro de la subcarpeta atlas-morelos
const PRIMARY_GEOJSON_URL = 'https://raw.githubusercontent.com/memolugo/DashboardATD/main/atlas-morelos/MorelosgeosonEPSG4326.geojson';
const FALLBACK_GEOJSON_URL = 'https://raw.githubusercontent.com/angelnmara/geojson-mexico/master/estados/Morelos.geojson';

const MapView: React.FC<MapViewProps> = ({ markers, selectedMarkerId, onMarkerClick, isLoading }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const leafletMarkersRef = useRef<Record<string, L.Marker>>({});

  const MARKER_COLOR = '#2E3B2B';

  const createCustomIcon = (color: string, isSelected: boolean) => {
    const size = isSelected ? 44 : 34;
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="${isSelected ? 'selected-marker-pulse' : ''}" style="
          background-color: ${color};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          border: 3.5px solid white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          ${isSelected ? 'transform: scale(1.1);' : ''}
        ">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [18.73, -99.05], 
      zoom: 10,
      minZoom: 9,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapInstanceRef.current = map;
    markersLayerRef.current = L.layerGroup().addTo(map);

    const fetchGeoJSON = async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const text = await response.text();
      return JSON.parse(text.trim().replace(/^\uFEFF/, ''));
    };

    const loadTerritory = async () => {
      try {
        const data = await fetchGeoJSON(PRIMARY_GEOJSON_URL);
        renderGeoJSON(data);
      } catch (err) {
        console.warn('Fallo carga de GeoJSON primario, intentando fallback...', err);
        try {
          const data = await fetchGeoJSON(FALLBACK_GEOJSON_URL);
          renderGeoJSON(data);
        } catch (f) {
          console.error('Fallo carga de GeoJSON fallback', f);
        }
      }
    };

    const renderGeoJSON = (data: any) => {
      if (mapInstanceRef.current) {
        geoJsonLayerRef.current = L.geoJSON(data, {
          style: {
            color: '#8c3154',
            weight: 3,
            opacity: 0.7,
            fillColor: '#8c3154',
            fillOpacity: 0.05,
          }
        }).addTo(mapInstanceRef.current);
        mapInstanceRef.current.fitBounds(geoJsonLayerRef.current.getBounds(), { padding: [20, 20] });
      }
    };

    loadTerritory();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current || isLoading) return;

    const layer = markersLayerRef.current;
    layer.clearLayers();
    leafletMarkersRef.current = {};

    markers.forEach((m) => {
      if (!m.latitud || !m.longitud) return;

      const pos: L.LatLngExpression = [m.latitud, m.longitud];
      const isSelected = selectedMarkerId === m.id;

      const marker = L.marker(pos, {
        icon: createCustomIcon(MARKER_COLOR, isSelected),
        zIndexOffset: isSelected ? 1000 : 0
      })
      .bindPopup(`
        <div style="font-family: 'Inter', sans-serif; width: 200px; padding: 4px;">
          <p style="margin: 0; font-size: 8px; font-weight: 800; color: #8c3154; text-transform: uppercase; letter-spacing: 1px;">${m.secretaria_organo}</p>
          <h4 style="margin: 6px 0; font-size: 13px; font-weight: 800; color: #111; line-height: 1.2;">${m.dependencia_entidad_adscrita}</h4>
          <p style="margin: 0; font-size: 10px; color: #666; font-weight: 500;">${m.ubicacion_1}</p>
        </div>
      `, { closeButton: false, className: 'atlas-popup' })
      .on('click', () => onMarkerClick(m));

      marker.addTo(layer);
      leafletMarkersRef.current[m.id] = marker;
    });

    if (selectedMarkerId) {
      const marker = leafletMarkersRef.current[selectedMarkerId];
      if (marker) {
        mapInstanceRef.current.flyTo(marker.getLatLng(), 16, { duration: 1.2 });
        setTimeout(() => marker.openPopup(), 1300);
      }
    }
  }, [markers, isLoading, selectedMarkerId]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainerRef} className="w-full h-full" />
      
      {isLoading && (
        <div className="absolute inset-0 z-[2000] bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#8c3154] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <button 
        onClick={() => {
          if (geoJsonLayerRef.current) mapInstanceRef.current?.fitBounds(geoJsonLayerRef.current.getBounds());
        }}
        className="absolute top-6 right-6 z-[1000] bg-white shadow-xl p-3 rounded-xl hover:scale-110 active:scale-95 transition-all text-gray-600"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" strokeWidth="2.5" /></svg>
      </button>
    </div>
  );
};

export default MapView;