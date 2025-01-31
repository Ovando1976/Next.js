import React, { useEffect, useRef, useState } from 'react';
import type { Map as LeafletMap, GeoJSON, Layer, LayerOptions } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './MapComponent.module.css';

// 1) Define an interface for your component props
interface MapComponentProps {
  // If setInfo is a callback that takes some info (unknown shape), you can keep it as (info: any) => void
  // or define a more specific type if you know what `info` looks like.
  setInfo: (info: any) => void;
  year: number;
}

// 2) Define the Leaflet import as a state type
type LeafletModule = typeof import('leaflet');

/**
 * A Leaflet-based map component to display various data layers (genetic, linguistic, etc.).
 */
const MapComponent: React.FC<MapComponentProps> = ({ setInfo, year }) => {
  // 3) Properly type our refs & states:
  const mapRef = useRef<LeafletMap | null>(null);
  
  // We'll store the dynamically imported Leaflet module here
  const [L, setL] = useState<LeafletModule | null>(null);
  
  // Example: keep track of each data layer. 
  // We'll assume each is a GeoJSON layer (or generally a Leaflet Layer).
  const [geneticLayer, setGeneticLayer] = useState<GeoJSON | null>(null);
  const [linguisticLayer, setLinguisticLayer] = useState<GeoJSON | null>(null);
  const [archaeologicalLayer, setArchaeologicalLayer] = useState<GeoJSON | null>(null);

  // 4) Initialize the map only once
  useEffect(() => {
    const initializeMap = async () => {
      // Import the Leaflet ESM module
      const leaflet = (await import('leaflet')) as LeafletModule;
      setL(leaflet);

      // If the map is not yet created, create it
      if (!mapRef.current) {
        mapRef.current = leaflet.map('map', {
          center: [9, 20], // Center on Africa
          zoom: 3,
          layers: [
            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap contributors',
            }),
          ],
        });

        // Fetch your genetic distribution data (JSON)
        const response = await fetch('/geneticData.json');
        const geneticData = await response.json();

        // Create a GeoJSON layer for the genetic data
        const gLayer = leaflet.geoJSON(geneticData, {
          pointToLayer: (feature, latlng) => {
            // Example usage: we return a Leaflet marker or custom icon
            // This returns a Leaflet 'Marker', but you used leaflet.divIcon
            // Adjust as needed:
            return leaflet.marker(latlng, {
              icon: leaflet.divIcon({
                className: styles.customMarker,
                html: feature.properties.genetic_marker[0], 
                iconSize: [20, 20],
                popupAnchor: [0, -10],
              }),
            });
          },
          onEachFeature: (feature, layer) => {
            if (feature.properties && feature.properties.population) {
              layer.bindPopup(
                `<b>${feature.properties.population}</b><br>${feature.properties.description}`,
                { className: styles.customPopup }
              );
            }
          },
        });

        // Update state with the newly created layer
        setGeneticLayer(gLayer);

        // Add the layer to the map
        gLayer.addTo(mapRef.current);
      }
    };

    void initializeMap(); // Fire & forget the async initialization

    // Cleanup on unmount to remove the map
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  /**
   * Toggles a given Leaflet layer on/off depending on `isVisible`.
   */
  const toggleLayer = (layer: Layer | null, isVisible: boolean) => {
    // guard for a valid map & layer
    if (!mapRef.current || !layer) return;

    if (isVisible) {
      layer.addTo(mapRef.current);
    } else {
      mapRef.current.removeLayer(layer);
    }
  };

  // 5) Example: show the genetic layer by default once everything is set
  useEffect(() => {
    if (L && geneticLayer && mapRef.current) {
      toggleLayer(geneticLayer, true);
    }
  }, [L, geneticLayer]);

  return (
    <div>
      <div id="map" style={{ height: '500px', width: '100%' }} />
      
      <div style={{ padding: '10px' }}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            onChange={(e) => toggleLayer(geneticLayer, e.target.checked)}
            defaultChecked
          />
          Genetic Data
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            onChange={(e) => toggleLayer(linguisticLayer, e.target.checked)}
          />
          Linguistic Data
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            onChange={(e) => toggleLayer(archaeologicalLayer, e.target.checked)}
          />
          Archaeological Data
        </label>
      </div>
    </div>
  );
};

export default MapComponent;