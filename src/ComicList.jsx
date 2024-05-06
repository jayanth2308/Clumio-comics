import React, { useState, useEffect } from 'react';
import api from './api';

function ComicList({ searchQuery, selectedCharacters }) {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); 
  const [totalPages, setTotalPages] = useState(1); 

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setIsLoading(true);
        const comicsToFetch = itemsPerPage * 2; 
        let params = {
          limit: comicsToFetch,
          offset: (currentPage - 1) * itemsPerPage,
        };
        if (searchQuery) params.titleStartsWith = searchQuery;
        if (selectedCharacters.length > 0) params.characters = selectedCharacters.join(',');

        const response = await api.get('comics', { params });
        const newComics = response.data.data.results.filter(comic => {
         
          return `${comic.thumbnail.path}.${comic.thumbnail.extension}` !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
        });
        setComics(newComics.slice(0, itemsPerPage)); 
        setTotalPages(Math.ceil(response.data.data.total / itemsPerPage));
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchComics();
  }, [searchQuery, selectedCharacters, currentPage, itemsPerPage]);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  const getNextComic = (index) => {
    for (let i = index + 1; i < comics.length; i++) {
      if (`${comics[i].thumbnail.path}.${comics[i].thumbnail.extension}` !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        return comics[i];
      }
    }
    return null; 
  };

  return (
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', height: '70vh', overflow: 'hidden' }} className='flex flex-col'>
      <h2 className="text-white text-center text-2xl mb-4">Comics</h2>
      <div className="flex justify-center flex-wrap gap-4">
        {comics.map((comic, index) => (
          <div key={index} className="bg-white bg-opacity-10 rounded-md text-white w-45 h-49">
            <div className="relative  h-full">
              <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} className="w-40 h-full object-cover rounded-md" />
              <h3 className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 h-14 p-2 overflow-hidden">{comic.title}</h3>
            </div>
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      )}
      <div className="mt-4 flex justify-center items-center mt-8 py-5">
        <button onClick={prevPage} disabled={currentPage === 1} className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md mr-2">
          &lt;
        </button>
        {Array.from({ length: Math.min(totalPages, 10) }, (_, index) => {
          const pageNumber = index + 1;
          const displayPageNumber = currentPage <= 5 ? pageNumber : currentPage - 5 + pageNumber;
          return (
            <button
              key={displayPageNumber}
              onClick={() => goToPage(displayPageNumber)}
              className={`text-white ${currentPage === displayPageNumber ? "font-bold" : ""} bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md mx-1`}
            >
              {displayPageNumber}
            </button>
          );
        })}
        <button onClick={nextPage} disabled={currentPage === totalPages} className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md ml-2">
          &gt;
        </button>
      </div>
    </div>
  );
}

export default ComicList;

