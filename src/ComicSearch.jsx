// // ComicSearch.jsx
// import React, { useState } from 'react';

// function ComicSearch({ setSearchQuery }) {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearchSubmit = (event) => {
//     event.preventDefault();
//     setSearchQuery(searchTerm);
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       setSearchQuery(searchTerm);
//     }
//   };

//   return (
//     <div className='comic-search flex justify-between items-center bg-red-600'>
//       <img src='/marvel.svg' className='p-2 ml-10' style={{ width: "150px", height: "50px" }} />
//       <form onSubmit={handleSearchSubmit} className='flex gap-2 mr-10'>
//         <div className="relative flex gap-2">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="Search by title..."
//             className="pl-8 pr-2 py-2 border rounded-xl"
//             onKeypress={handleKeyPress} // Added onKeyPress event handler
//           />
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="absolute top-2 left-1 w-6 h-6 text-gray-500 pointer-events-none"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
//             />
//           </svg>
//         </div>
//         <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded-2xl mr-2">Search</button>
//       </form>
//     </div>
//   );
// }

// export default ComicSearch;

// ComicSearch.jsx
import React, { useState } from 'react';

function ComicSearch({ setSearchQuery }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value === '') { // Check if the input is empty
      setSearchQuery(''); // Reset the search query in the parent component
    }
  };
  

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setSearchQuery(searchTerm);
    }
  };

  return (
    <div className='comic-search flex justify-between items-center bg-red-600'>
      <img src='/marvel.svg' className='p-2 ml-10' style={{ width: "150px", height: "50px" }} />
      <form onSubmit={handleSearchSubmit} className='flex gap-2 mr-10'>
        <div className="relative flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by title..."
            className="pl-8 pr-2 py-2 border rounded-xl"
            onKeyPress={handleKeyPress} // Corrected event handler
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="absolute top-2 left-1 w-6 h-6 text-gray-500 pointer-events-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded-2xl mr-2">Search</button>
      </form>
    </div>
  );
}

export default ComicSearch;

