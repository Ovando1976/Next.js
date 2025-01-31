import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import L, { LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";

// ------------ IMPORTANT --------------
// All Leaflet usage must be inside a component that
// you only import dynamically on the client side.
// -------------------------------------

// Fix Leaflet's default icon paths using CDN URLs:
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface IMarker {
  id: string;
  lat: number;
  lng: number;
  tribeName: string;
  yearPlaced: number;
}

interface MapProps {
  setInfo: (info: any) => void;
  year: number;
  setYear: (year: number) => void;
}

const MapComponent: React.FC<MapProps> = ({ setInfo, year, setYear }) => {
  // Track user-defined markers across the map
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [currentTribeName, setCurrentTribeName] = useState<string>("New Tribe");

  // Store polylines keyed by tribe name
  const [tribePolylines, setTribePolylines] = useState<
    Record<string, [number, number][]>
  >({});

  useEffect(() => {
    console.log("Year changed:", year);
    // If you'd like to hide future markers, you can do so here
    // e.g., filter the displayed markers based on the selected year
  }, [year]);

  /**********************************************
   * 📌 Handling Marker Creation on Map Click
   **********************************************/
  const MapEventHandler = () => {
    useMapEvents({
      click: (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;

        const newMarker: IMarker = {
          id: `${Date.now()}-${Math.random()}`,
          lat,
          lng,
          tribeName: currentTribeName,
          yearPlaced: year,
        };

        setMarkers((prev) => [...prev, newMarker]);

        // Append to polylines by tribe
        setTribePolylines((prev) => {
          const existingCoords = prev[currentTribeName] || [];
          return {
            ...prev,
            [currentTribeName]: [...existingCoords, [lat, lng]],
          };
        });

        // Pass info back up to the parent
        setInfo({
          clickedCoordinates: { lat, lng },
          yearUsed: year,
          tribeName: currentTribeName,
        });
      },
    });
    return null;
  };

  /**********************************************
   * 📌 Helper to filter Markers by current year
   **********************************************/
  const getVisibleMarkers = () => {
    // Example logic: show only markers up to the current year
    return markers.filter((m) => m.yearPlaced <= year);
  };

  /**********************************************
   * 📌 Render Polylines for each tribe
   **********************************************/
  const renderPolylines = () => {
    return Object.keys(tribePolylines).map((tribeName) => {
      // Only show the points up to current year
      const coordsUpToYear: [number, number][] = markers
        .filter((m) => m.tribeName === tribeName && m.yearPlaced <= year)
        .map((m) => [m.lat, m.lng]);

      if (coordsUpToYear.length < 2) return null; // Need at least 2 points

      return (
        <Polyline
          key={`polyline-${tribeName}`}
          positions={coordsUpToYear}
          color="red"
        />
      );
    });
  };

  return (
    <div style={{ display: "flex", height: "70vh", position: "relative" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "300px",
          padding: "10px",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3>Human Evolution Map</h3>
          <p>Use the map to place tribes/settlements across time.</p>
        </div>

        <div style={{ margin: "10px 0" }}>
          <label htmlFor="tribeName">Tribe Name: </label>
          <input
            id="tribeName"
            type="text"
            value={currentTribeName}
            onChange={(e) => setCurrentTribeName(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <button onClick={() => setYear(year - 10000)}>← 10,000 Years</button>
          <span style={{ margin: "0 10px" }}>Year: {year}</span>
          <button onClick={() => setYear(year + 10000)}>10,000 Years →</button>
        </div>

        <div>
          <input
            type="range"
            min="-2000000"
            max="2023"
            step="10000"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            style={{ width: "100%" }}
          />
          <small>Timeline (2M years ago to present)</small>
        </div>

        <div style={{ marginTop: "auto" }}>
          <h4>Marked Tribes</h4>
          <ul style={{ maxHeight: "150px", overflowY: "auto" }}>
            {markers.map((m) => (
              <li key={m.id}>
                [{m.tribeName}] at ({m.lat.toFixed(2)}, {m.lng.toFixed(2)}) —{" "}
                {m.yearPlaced}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Map Container */}
      <MapContainer
        center={[20, 0]} // Center over Africa
        zoom={3}
        scrollWheelZoom
        style={{ flex: 1, height: "70vh" }}
      >
        {/* Base Tile Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        <MapEventHandler />

        {getVisibleMarkers().map((marker) => (
          <Marker key={marker.id} position={[marker.lat, marker.lng]}>
            <Popup>
              <strong>{marker.tribeName}</strong>
              <br />
              Year: {marker.yearPlaced.toLocaleString()}
              <br />
              Coords: {marker.lat.toFixed(2)}, {marker.lng.toFixed(2)}
            </Popup>
          </Marker>
        ))}

        {renderPolylines()}
      </MapContainer>
    </div>
  );
};

export default MapComponent;