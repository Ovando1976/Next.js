import React from "react";
import { evolutionData, EvolutionEvent } from "../data/evolutionData";

interface EvolutionTimelineProps {
  selectedEventId: string | null;
  onSelectEvent: (eventId: string) => void;
}

const EvolutionTimeline: React.FC<EvolutionTimelineProps> = ({
  selectedEventId,
  onSelectEvent,
}) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <h2>Human Evolution Timeline</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {evolutionData.map((event) => (
          <li
            key={event.id}
            style={{
              cursor: "pointer",
              margin: "0.5rem 0",
              fontWeight: event.id === selectedEventId ? "bold" : "normal",
            }}
            onClick={() => onSelectEvent(event.id)}
          >
            {/* Display something like “300,000 years ago – Homo sapiens Appear” */}
            {Math.abs(event.year).toLocaleString()} years ago – {event.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EvolutionTimeline;
