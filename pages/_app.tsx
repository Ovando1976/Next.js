import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import MapComponent from "../components/MapComponent";
import TimeSlider from "../components/TimeSlider";
import InfoPanel from "../components/InfoPanel";
import ErrorBoundary from "../components/ErrorBoundary";

function MyApp() {
  const [year, setYear] = useState(2020);
  const [info, setInfo] = useState(null);

  return (
    <ErrorBoundary>
      <div className="App">
        <MapComponent setInfo={setInfo} year={year} />
        <TimeSlider year={year} setYear={setYear} />
        <InfoPanel info={info} />
      </div>
    </ErrorBoundary>
  );
}

export default MyApp;
