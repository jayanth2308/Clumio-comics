import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import api from './api';

function ComicFilter({ setSelectedCharacters, resetPage }) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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
    const isSelected = selectedIds.includes(id);
    let updatedIds, updatedNames;
  
    if (isSelected) {
      updatedIds = selectedIds.filter((selectedId) => selectedId !== id);
      updatedNames = selectedNames.filter((selectedName) => selectedName !== name);
    } else {
      updatedIds = [...selectedIds, id];
      updatedNames = [...selectedNames, name];
    }
    resetPage();
    setSelectedIds(updatedIds);
    setSelectedNames(updatedNames);
    setSelectedCharacters(updatedIds.length > 0 ? updatedIds : []);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6, 
    slidesToScroll: 1,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredCharacters = characters.filter(character => (
    character.thumbnail &&
    character.thumbnail.path &&
    character.thumbnail.extension &&
    !character.thumbnail.path.includes("image_not_available")
  ));

  return (
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', padding: '20px', maxWidth: '100%', margin: '0 auto' }}> 
        <div style={{ maxWidth: 'calc(100% - 120px)', margin: '0 auto' }}> 
            <Slider {...settings}>
                {filteredCharacters.map((character) => (
                    <div key={character.id} className="text-center">
                        <div
                            className={`inline-block relative ${selectedIds.includes(character.id) ? 'border-4 border-blue-500 rounded-full' : ''}`}
                            onClick={() => handleCharacterClick(character.id, character.name)}
                        >
                            <img
                                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                alt={character.name}
                                className="w-32 h-32 rounded-full cursor-pointer"
                                style={{ margin: '10px', objectFit: 'cover', border: '4px solid transparent' }}
                            />
                        </div>
                        <p className="text-white">{character.name}</p>
                    </div>
                ))}
            </Slider>
        </div>
        {selectedNames.length > 0 && (
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
