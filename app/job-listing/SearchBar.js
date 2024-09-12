"use client";
import { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search job titles..."
        style={{ padding: '8px', width: '700px', height: '40px', borderRadius: '50px', border: '1px solid #ccc', fontFamily: 'Poppins, sans-serif', fontSize: '16px' }}
      />
    <button variant="contained" style={{ backgroundColor: '#b1cccc', border: '1px solid #b1cccc' , borderRadius: '50%', width: '40px', height: '40px', marginLeft: '10px', cursor: 'pointer' }}>
        <ArrowForwardIcon style={{ fontSize: '24px' }}>add</ArrowForwardIcon>
    </button>
    </form>
  );
};

export default SearchBar;