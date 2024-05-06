// // ComicList.jsx
// import React, { useState, useEffect } from 'react';
// import api from './api';

// function ComicList({ searchQuery, selectedCharacters }) {
//   const [comics, setComics] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchComics = async () => {
//       try {
//         let params = {};
//         if (searchQuery) params.titleStartsWith = searchQuery;
//         if (selectedCharacters.length > 0) params.characters = selectedCharacters.join(',');

//         const response = await api.get('comics', { params });
//         setComics(response.data.data.results);
//         setIsLoading(false);
//       } catch (error) {
//         setError(error);
//         setIsLoading(false);
//       }
//     };

//     fetchComics();
//   }, [searchQuery, selectedCharacters]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <h2>Comics</h2>
//       <ul>
//         {comics.map((comic) => (
//           <li key={comic.id}>
//             <h3>{comic.title}</h3>
//             <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ComicList;

//original//

// import React, { useState, useEffect } from 'react';
// import api from './api';

// function ComicList({ searchQuery, selectedCharacters }) {
//   const [comics, setComics] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchComics = async () => {
//       try {
//         let params = {};

//         // Include search query if available
//         if (searchQuery) params.titleStartsWith = searchQuery;

//         // Include selected characters if available
//         if (selectedCharacters.length > 0) {
//           // Join selected character IDs into a comma-separated string
//           params.characters = selectedCharacters.join(',');
//         }

//         // Fetch comics with the specified parameters
//         const response = await api.get('comics', { params });
//         let filteredComics = response.data.data.results;

//         // Filter comics based on search query or selected characters
//         if (searchQuery || selectedCharacters.length > 0) {
//           // Filter comics that include either search query or selected characters
//           filteredComics = filteredComics.filter(comic => {
//             const hasSearchQuery = !searchQuery || comic.title.toLowerCase().includes(searchQuery.toLowerCase());
//             const hasSelectedCharacters = !selectedCharacters.length > 0 || 
//               (comic.characters && comic.characters.items && 
//               comic.characters.items.some(item => selectedCharacters.includes(item.id.toString())));
//             return hasSearchQuery || hasSelectedCharacters;
//           });
//         }

//         setComics(filteredComics);
//         setIsLoading(false);
//       } catch (error) {
//         setError(error);
//         setIsLoading(false);
//       }
//     };

//     fetchComics();
//   }, [searchQuery, selectedCharacters]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <h2>Comics</h2>
//       <ul>
//         {comics.map((comic) => (
//           <li key={comic.id}>{comic.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ComicList;


// import React, { useState, useEffect } from 'react';
// import api from './api';

// function ComicList({ searchQuery, selectedCharacters }) {
//   const [comics, setComics] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(4); // Adjusted to 4 comics per page
//   const [totalPages, setTotalPages] = useState(1); // Added state for total pages

//   useEffect(() => {
//     const fetchComics = async () => {
//       try {
//         let params = {
//           limit: searchQuery ? 100 : itemsPerPage,
//           offset: searchQuery ? 0 : (currentPage - 1) * itemsPerPage,
//         };
//         if (searchQuery) params.titleStartsWith = searchQuery;
//         if (selectedCharacters.length > 0) params.characters = selectedCharacters.join(',');

//         const response = await api.get('comics', { params });
//         const newComics = response.data.data.results;
//         setComics((prevComics) => [...prevComics, ...newComics]); // Concatenate new comics with previous ones
//         setTotalPages(Math.ceil(response.data.data.total / itemsPerPage)); // Update total pages based on total comics
//         setIsLoading(false);
//       } catch (error) {
//         setError(error);
//         setIsLoading(false);
//       }
//     };

//     fetchComics();
//   }, [searchQuery, selectedCharacters, currentPage, itemsPerPage]);

//   const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const goToPage = (pageNumber) => setCurrentPage(pageNumber);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   const indexOfLastComic = currentPage * itemsPerPage;
//   const indexOfFirstComic = indexOfLastComic - itemsPerPage;
//   const currentComics = comics.slice(indexOfFirstComic, indexOfLastComic);

//   return (
//     <div>
//       <h2>Comics</h2>
//       <div className="grid grid-cols-4 gap-4">
//         {currentComics.map((comic) => (
//           <div key={comic.id}>
//             <h3>{comic.title}</h3>
//             <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} className="w-24 h-24" />
//           </div>
//         ))}
//       </div>
//       <div className="mt-4">
//         <button onClick={prevPage} disabled={currentPage === 1}>&lt;</button>
//         {Array.from({ length: Math.min(totalPages, 10) }, (_, index) => {
//           const pageNumber = index + 1;
//           const displayPageNumber = currentPage <= 5 ? pageNumber : currentPage - 5 + pageNumber;
//           return (
//             <button key={displayPageNumber} onClick={() => goToPage(displayPageNumber)} className={currentPage === displayPageNumber ? "font-bold mx-1" : "mx-1"}>{displayPageNumber}</button>
//           );
//         })}
//         <button onClick={nextPage} disabled={currentPage === totalPages}>&gt;</button>
//       </div>
//     </div>
//   );
// }

// export default ComicList;


//original

// import React, { useState, useEffect } from 'react';
// import api from './api';

// function ComicList({ searchQuery, selectedCharacters }) {
//   const [comics, setComics] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(4); // Adjusted to 4 comics per page
//   const [totalPages, setTotalPages] = useState(1); // Added state for total pages

//   useEffect(() => {
//     const fetchComics = async () => {
//       try {
//         setIsLoading(true);
//         const comicsToFetch = itemsPerPage * 2; // Fetch double the number of itemsPerPage
//         let params = {
//           limit: comicsToFetch,
//           offset: (currentPage - 1) * itemsPerPage,
//         };
//         if (searchQuery) params.titleStartsWith = searchQuery;
//         if (selectedCharacters.length > 0) params.characters = selectedCharacters.join(',');

//         const response = await api.get('comics', { params });
//         const newComics = response.data.data.results.filter(comic => {
//           // Filter out comics with image_not_available.jpg
//           return `${comic.thumbnail.path}.${comic.thumbnail.extension}` !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
//         });
//         setComics(newComics.slice(0, itemsPerPage)); // Set only the comics required for the current page
//         setTotalPages(Math.ceil(response.data.data.total / itemsPerPage)); // Update total pages based on total comics
//         setIsLoading(false);
//       } catch (error) {
//         setError(error);
//         setIsLoading(false);
//       }
//     };

//     fetchComics();
//   }, [searchQuery, selectedCharacters, currentPage, itemsPerPage]);

//   const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const goToPage = (pageNumber) => setCurrentPage(pageNumber);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   // Function to find the next available comic if the current one has the 'image_not_available' image
//   const getNextComic = (index) => {
//     for (let i = index + 1; i < comics.length; i++) {
//       if (`${comics[i].thumbnail.path}.${comics[i].thumbnail.extension}` !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
//         return comics[i];
//       }
//     }
//     return null; // If no next available comic is found
//   };

//   return (
//     <div>
//       <h2>Comics</h2>
//       <div className="grid grid-cols-4 gap-4">
//         {comics.map((comic, index) => (
//           <div key={comic.id}>
//             <h3>{comic.title}</h3>
//             {`${comic.thumbnail.path}.${comic.thumbnail.extension}` !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? (
//               <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} className="w-24 h-24" />
//             ) : (
//               // Display next available comic if current one has the 'image_not_available' image
//               getNextComic(index) ? (
//                 <>
//                   <h3>{getNextComic(index).title}</h3>
//                   <img src={`${getNextComic(index).thumbnail.path}.${getNextComic(index).thumbnail.extension}`} alt={getNextComic(index).title} className="w-24 h-24" />
//                 </>
//               ) : (
//                 // If no next available comic, display a placeholder
//                 <div>No image available</div>
//               )
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="mt-4">
//         <button onClick={prevPage} disabled={currentPage === 1}>&lt;</button>
//         {Array.from({ length: Math.min(totalPages, 10) }, (_, index) => {
//           const pageNumber = index + 1;
//           const displayPageNumber = currentPage <= 5 ? pageNumber : currentPage - 5 + pageNumber;
//           return (
//             <button key={displayPageNumber} onClick={() => goToPage(displayPageNumber)} className={currentPage === displayPageNumber ? "font-bold mx-1" : "mx-1"}>{displayPageNumber}</button>
//           );
//         })}
//         <button onClick={nextPage} disabled={currentPage === totalPages}>&gt;</button>
//       </div>
//     </div>
//   );
// }

// export default ComicList;

//original

// import React, { useState, useEffect } from 'react';
// import api from './api';

// function ComicList({ searchQuery, selectedCharacters }) {
//   const [comics, setComics] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(4); // Adjusted to 4 comics per page
//   const [totalPages, setTotalPages] = useState(1); // Added state for total pages

//   useEffect(() => {
//     const fetchComics = async () => {
//       try {
//         setIsLoading(true);
//         const comicsToFetch = itemsPerPage * 2; // Fetch double the number of itemsPerPage
//         let params = {
//           limit: comicsToFetch,
//           offset: (currentPage - 1) * itemsPerPage,
//         };
//         if (searchQuery) params.titleStartsWith = searchQuery;
//         if (selectedCharacters.length > 0) params.characters = selectedCharacters.join(',');

//         const response = await api.get('comics', { params });
//         const newComics = response.data.data.results.filter(comic => {
//           // Filter out comics with image_not_available.jpg
//           return `${comic.thumbnail.path}.${comic.thumbnail.extension}` !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
//         });
//         setComics(newComics.slice(0, itemsPerPage)); // Set only the comics required for the current page
//         setTotalPages(Math.ceil(response.data.data.total / itemsPerPage)); // Update total pages based on total comics
//         setIsLoading(false);
//       } catch (error) {
//         setError(error);
//         setIsLoading(false);
//       }
//     };

//     fetchComics();
//   }, [searchQuery, selectedCharacters, currentPage, itemsPerPage]);

//   const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const goToPage = (pageNumber) => setCurrentPage(pageNumber);

//   // if (isLoading) return <div>Loading...</div>;
//   if (isLoading) return (
//     <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', maxHeight: '100vh', overflow: 'hidden' }} className='flex flex-col'>
//       <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
//         <div className="text-white">Loading...</div>
//       </div>
//     </div>
//   );
  
//   if (error) return <div>Error: {error.message}</div>;

//   // Function to find the next available comic if the current one has the 'image_not_available' image
//   const getNextComic = (index) => {
//     for (let i = index + 1; i < comics.length; i++) {
//       if (`${comics[i].thumbnail.path}.${comics[i].thumbnail.extension}` !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
//         return comics[i];
//       }
//     }
//     return null; // If no next available comic is found
//   };

//   return (
//     <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px' , maxHeight: '100vh' , overflow: 'hidden'}} className='flex flex-col '>
//       <h2 className="text-white text-center text-2xl mb-4">Comics</h2>
//       <div className="flex justify-center flex-wrap gap-4">
//       {comics.map((comic, index) => (
//         <div key={index} className="bg-white bg-opacity-10  rounded-md text-white w-45 h-49">
//           <div className="relative  h-full">
//             <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} className="w-40 h-full object-cover rounded-md" />
//             <h3 className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 h-14 p-2 overflow-hidden">{comic.title}</h3>
//           </div>
//         </div>
//       ))}
//       </div>
//       <div className="mt-4 flex justify-center items-center mt-8 py-5">
//         <button onClick={prevPage} disabled={currentPage === 1} className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md mr-2">
//           &lt;
//         </button>
//         {Array.from({ length: Math.min(totalPages, 10) }, (_, index) => {
//           const pageNumber = index + 1;
//           const displayPageNumber = currentPage <= 5 ? pageNumber : currentPage - 5 + pageNumber;
//           return (
//             <button
//               key={displayPageNumber}
//               onClick={() => goToPage(displayPageNumber)}
//               className={`text-white ${currentPage === displayPageNumber ? "font-bold" : ""} bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md mx-1`}
//             >
//               {displayPageNumber}
//             </button>
//           );
//         })}
//         <button onClick={nextPage} disabled={currentPage === totalPages} className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md ml-2">
//           &gt;
//         </button>
//       </div>

//     </div>
//   );
// }

// export default ComicList;



import React, { useState, useEffect } from 'react';
import api from './api';

function ComicList({ searchQuery, selectedCharacters }) {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Adjusted to 4 comics per page
  const [totalPages, setTotalPages] = useState(1); // Added state for total pages

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setIsLoading(true);
        const comicsToFetch = itemsPerPage * 2; // Fetch double the number of itemsPerPage
        let params = {
          limit: comicsToFetch,
          offset: (currentPage - 1) * itemsPerPage,
        };
        if (searchQuery) params.titleStartsWith = searchQuery;
        if (selectedCharacters.length > 0) params.characters = selectedCharacters.join(',');

        const response = await api.get('comics', { params });
        const newComics = response.data.data.results.filter(comic => {
          // Filter out comics with image_not_available.jpg
          return `${comic.thumbnail.path}.${comic.thumbnail.extension}` !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
        });
        setComics(newComics.slice(0, itemsPerPage)); // Set only the comics required for the current page
        setTotalPages(Math.ceil(response.data.data.total / itemsPerPage)); // Update total pages based on total comics
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

    // Function to find the next available comic if the current one has the 'image_not_available' image
  const getNextComic = (index) => {
    for (let i = index + 1; i < comics.length; i++) {
      if (`${comics[i].thumbnail.path}.${comics[i].thumbnail.extension}` !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        return comics[i];
      }
    }
    return null; // If no next available comic is found
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

