import React from 'react';
import styles from './TimelineSlider.module.css';

interface TimelineSliderProps {
  year: number;
  setYear: (year: number) => void;
}

const TimelineSlider: React.FC<TimelineSliderProps> = ({ year, setYear }) => {
  return (
    <div className={styles.sliderContainer}>
      <input
        type="range"
        min="-400000" // Start year (e.g., MIS-11)
        max="0"      // End year (present)
        value={year}
        className={styles.slider}
        onChange={(e) => setYear(Number(e.target.value))}
      />
      <div className={styles.yearLabel}>Year: {year}</div>
    </div>
  );
};

export default TimelineSlider;
