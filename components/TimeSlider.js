import React from 'react';

const TimeSlider = ({ year, setYear }) => {
    return (
        <div style={{ padding: '10px' }}>
            <input
                type="range"
                min="1000"
                max="2020"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                step="10"
            />
            <div>Year: {year}</div>
        </div>
    );
};

export default TimeSlider;
