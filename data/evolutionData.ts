// Example timeline data for demonstration.
// Each event can include the approximate year (in thousands or millions of years ago),
// a label, a brief description, possible lat/lon for the map, etc.

export interface EvolutionEvent {
  id: string;
  title: string;
  year: number; // e.g., -300000 = 300k years ago
  description: string;
  latitude?: number; // optional location if relevant
  longitude?: number; // optional location if relevant
  imageUrl?: string; // for more context, if you want
}

export const evolutionData: EvolutionEvent[] = [
  {
    id: "homo-habilis",
    title: "Homo habilis Emerges",
    year: -2300000, // 2.3 million years ago
    description:
      "Considered one of the earliest members of the genus Homo; known for use of stone tools.",
    latitude: -1.95, // approximate region in East Africa
    longitude: 37.34,
  },
  {
    id: "homo-erectus-out-of-africa",
    title: "Homo erectus Migrations",
    year: -1800000,
    description:
      "Homo erectus expands beyond Africa, reaching areas in Asia and possibly Europe.",
    latitude: 0.03,
    longitude: 38.74,
  },
  {
    id: "homo-sapiens-appearance",
    title: "Homo sapiens Appear",
    year: -300000,
    description:
      "Anatomically modern humans begin to appear in Africa and eventually spread worldwide.",
    latitude: 2.0,
    longitude: 37.5,
  },
  {
    id: "out-of-africa",
    title: "Out of Africa",
    year: -70000,
    description:
      "The major migration of Homo sapiens from Africa to other continents, eventually replacing other hominins.",
    latitude: 3.0,
    longitude: 36.0,
  },
  // ... more data as needed
];
