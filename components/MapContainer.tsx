import React, { useState } from "react";
import TimelineSlider from "./TimelineSlider";
import MapComponent from "./MapComponent";

const MapContainer: React.FC = () => {
  const [year, setYear] = useState(0);
  const [info, setInfo] = useState<any>(null);

  // For the map token, either hardcode or read from .env
  const mapboxToken =
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "YOUR_MAPBOX_TOKEN";

  return (
    <div>
      <TimelineSlider year={year} setYear={setYear} />

      {/* Provide setYear & mapboxToken as required by the interface */}
      <MapComponent
        setInfo={setInfo}
        year={year}
        setYear={setYear}
        mapboxToken={mapboxToken}
      />

      {info && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f9f9f9",
            marginTop: "10px",
          }}
        >
          <h3>Details</h3>
          <pre>{JSON.stringify(info, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MapContainer;
