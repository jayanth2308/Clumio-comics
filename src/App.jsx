// App.jsx
import React, { useState } from 'react';
import ComicList from './ComicList';
import ComicSearch from './ComicSearch';
import ComicFilter from './ComicFilter';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  return (
    <div className="bg-wallpaper bg-opacity-50">
      <ComicSearch setSearchQuery={setSearchQuery} />
      <ComicFilter setSelectedCharacters={setSelectedCharacters} />
      <ComicList searchQuery={searchQuery} selectedCharacters={selectedCharacters} />
    </div>
  );
}

export default App;
