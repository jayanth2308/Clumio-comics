

// ComicFilter.jsx
// import React, { useState, useEffect } from 'react';
// import api from './api';

// function ComicFilter({ setSelectedCharacters }) {
//   const [characters, setCharacters] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [selectedNames, setSelectedNames] = useState([]);

//   useEffect(() => {
//     const fetchCharacters = async () => {
//       try {
//         const response = await api.get('characters');
//         setCharacters(response.data.data.results);
//         setIsLoading(false);
//       } catch (error) {
//         setError(error);
//         setIsLoading(false);
//       }
//     };

//     fetchCharacters();
//   }, []);

//   const handleCharacterClick = (id, name) => {
//     // Toggle selection
//     const isSelected = selectedIds.includes(id);
//     if (isSelected) {
//       setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
//       setSelectedNames(selectedNames.filter((selectedName) => selectedName !== name));
//     } else {
//       setSelectedIds([...selectedIds, id]);
//       setSelectedNames([...selectedNames, name]);
//     }
    
//     // Set selected characters
//     setSelectedCharacters(selectedIds);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   // Slice characters array to only display the first 6 characters
//   const slicedCharacters = characters.slice(0, 6);

//   return (
//     <div>
//       <h2 className="text-xl font-bold">Filter Comics by Characters</h2>
//       <div className="flex flex-wrap mt-2">
//         {slicedCharacters.map((character) => (
//           <img
//             key={character.id}
//             src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
//             alt={character.name}
//             className={`w-32 h-32 mr-4 rounded-full cursor-pointer ${selectedIds.includes(character.id) ? 'border-4 border-blue-500' : ''}`}
//             onClick={() => handleCharacterClick(character.id, character.name)}
//           />
//         ))}
//       </div>
//       <div className="mt-4">
//         <p className="font-bold">Selected Characters:</p>
//         <ul>
//           {selectedNames.map((name, index) => (
//             <li key={index}>{name}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default ComicFilter;







// // ComicFilter.jsx
// import React, { useState, useEffect } from 'react';
// import api from './api';

// function ComicFilter({ setSelectedCharacters }) {
//   const [characters, setCharacters] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [selectedNames, setSelectedNames] = useState([]);

//   useEffect(() => {
//     const fetchCharacters = async () => {
//       try {
//         const response = await api.get('characters');
//         setCharacters(response.data.data.results);
//         setIsLoading(false);
//       } catch (error) {
//         setError(error);
//         setIsLoading(false);
//       }
//     };

//     fetchCharacters();
//   }, []);

//   const handleCharacterClick = (id, name) => {
//     // Toggle selection
//     const isSelected = selectedIds.includes(id);
//     if (isSelected) {
//       setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
//       setSelectedNames(selectedNames.filter((selectedName) => selectedName !== name));
//     } else {
//       setSelectedIds([...selectedIds, id]);
//       setSelectedNames([...selectedNames, name]);
//     }
    
//     // Set selected characters
//     setSelectedCharacters(selectedIds);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   // Filter out characters with placeholder images
//   const filteredCharacters = characters.filter(character => (
//     character.thumbnail &&
//     character.thumbnail.path &&
//     character.thumbnail.extension &&
//     !character.thumbnail.path.includes("image_not_available")
//   ));

//   // Slice characters array to only display the first 6 characters
//   const slicedCharacters = filteredCharacters.slice(0, 6);

//   return (
//     <div>
//       <h2 className="text-xl font-bold">Filter Comics by Characters</h2>
//       <div className="flex flex-wrap mt-2">
//         {slicedCharacters.map((character) => (
//           <img
//             key={character.id}
//             src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
//             alt={character.name}
//             className={`w-32 h-32 mr-4 rounded-full cursor-pointer ${selectedIds.includes(character.id) ? 'border-4 border-blue-500' : ''}`}
//             onClick={() => handleCharacterClick(character.id, character.name)}
//           />
//         ))}
//       </div>
//       <div className="mt-4">
//         <p className="font-bold">Selected Characters:</p>
//         <ul>
//           {selectedNames.map((name, index) => (
//             <li key={index}>{name}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default ComicFilter;

import React, { useState, useEffect } from 'react';
import api from './api';

function ComicFilter({ setSelectedCharacters }) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await api.get('characters');
        setCharacters(response.data.data.results);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleCharacterClick = (id, name) => {
    // Toggle selection
    const isSelected = selectedIds.includes(id);
    if (isSelected) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
      setSelectedNames(selectedNames.filter((selectedName) => selectedName !== name));
    } else {
      setSelectedIds([...selectedIds, id]);
      setSelectedNames([...selectedNames, name]);
    }
    
    // Set selected characters
    setSelectedCharacters(selectedIds);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Filter out characters with placeholder images
  const filteredCharacters = characters.filter(character => (
    character.thumbnail &&
    character.thumbnail.path &&
    character.thumbnail.extension &&
    !character.thumbnail.path.includes("image_not_available")
  ));

  // Slice characters array to only display the first 6 characters
  const slicedCharacters = filteredCharacters.slice(0, 6);

  return (
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', padding: '20px' }}>
      {/* <h2 className="text-xl font-bold text-white">Filter Comics by Characters</h2> */}
      <div className="flex flex-wrap mt-2 justify-center">
        {slicedCharacters.map((character) => (
          <img
            key={character.id}
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            className={`w-32 h-32 mr-4 rounded-full cursor-pointer ${selectedIds.includes(character.id) ? 'border-4 border-blue-500' : ''}`}
            onClick={() => handleCharacterClick(character.id, character.name)}
            style={{ margin: '10px', objectFit: 'cover' }}
          />
        ))}
      </div>
      {selectedNames.length > 0 && ( // Conditionally render selected characters section
        <div className="mt-4">
          <p className="font-bold text-white">Selected Characters:</p>
          <div className="flex flex-wrap">
            {selectedNames.map((name, index) => (
              <div key={index} className="text-white mr-4">{name}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ComicFilter;

