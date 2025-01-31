import React from 'react';

const InfoPanel = ({ info }) => {
    if (!info) {
        return null;
    }

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc' }}>
            <h4>Details</h4>
            <p>{info.description}</p>
        </div>
    );
};

export default InfoPanel;
