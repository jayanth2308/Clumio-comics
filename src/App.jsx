import React, { useState, useEffect } from 'react';
import ComicList from './ComicList';
import ComicSearch from './ComicSearch';
import ComicFilter from './ComicFilter';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialPage, setInitialPage] = useState(1);

  const resetPage = () => {
    setCurrentPage(initialPage);
  };

  useEffect(() => {
    if (selectedCharacters.length === 0) {
      resetPage();
    }
  }, [selectedCharacters, initialPage]);

  return (
    <div className="bg-wallpaper bg-opacity-50">
      <ComicSearch setSearchQuery={setSearchQuery} />
      <ComicFilter setSelectedCharacters={setSelectedCharacters} resetPage={resetPage} />
      <ComicList searchQuery={searchQuery} selectedCharacters={selectedCharacters} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
