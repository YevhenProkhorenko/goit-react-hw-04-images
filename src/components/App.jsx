import React, { useState, useEffect } from 'react';
import API from './API/API';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export default function App() {
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }
    const fetchImg = () => {
      setLoading(true);
      try {
        API(query, page)
          .then(data => {
            setPictures(prevState => {
              return [...prevState, ...data];
            });
          })
          .finally(() => setLoading(false));
      } catch (error) {
        console.log(error);
      }
    };
    fetchImg();
  }, [query, page]);

  const changeQuery = newQuery => {
    if (query !== newQuery) {
      setQuery(newQuery);
      setPage(1);
      setPictures([]);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openSelectedImage = largeImageURL => {
    setSelectedImage(largeImageURL);
    toggleModal();
  };

  const isImages = Boolean(pictures.length);
  return (
    <div>
      <Searchbar onSubmit={changeQuery} />
      {isImages && (
        <ImageGallery items={pictures} clickOnImage={openSelectedImage} />
      )}

      {isImages && <Button onClick={nextPage} text={'Load more'} />}
      {loading && <Loader />}
      {modalOpen && (
        <Modal onClose={toggleModal} largeImageURL={selectedImage} />
      )}
    </div>
  );
}
