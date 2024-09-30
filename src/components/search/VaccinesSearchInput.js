import React from 'react';

const VaccinesSearchInput = ({ searchTerm, handleSearch }) => {
    return (
        <input
            type="text"
            placeholder="Search by Vaccine Name or Producer"
            className="form-control mb-3 w-50"
            value={searchTerm}
            onChange={handleSearch}
        />
    );
};

export default VaccinesSearchInput;
