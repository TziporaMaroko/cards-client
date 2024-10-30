import React from 'react';
import style from './SearchBar.module.css';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className={style.searchContainer}>
      <input
        type="text"
        placeholder="Search cards..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={style.searchBar}
      />
    </div>
  );
};

export default SearchBar;
