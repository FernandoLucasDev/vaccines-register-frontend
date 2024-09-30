import React from 'react';

const SearchInput = ({ searchTerm, handleSearch }) => {
    return (
        <input
            type="text"
            placeholder="Search by Name, CPF, or Vaccine"
            className="form-control mb-3 w-50"
            value={searchTerm}
            onChange={handleSearch}
        />
    );
};

export default SearchInput;
