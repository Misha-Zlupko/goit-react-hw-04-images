import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
// import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { Component } from 'react';
import './styles.css';
import { useState, useEffect } from 'react';

import { getPosts } from './Server/server';

export const App = () => {
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [imageModal, setImageModal] = useState('');

  const handleSearch = async search => {
    setSearch(search);
    setPage(1);
    setHits([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getPosts(search, page);
        setHits(prevHits => [...prevHits, ...response.hits]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, [search, page]);
  const handleChangePage = () => {
    setPage(prev => prev.page + 1);
  };

  const modalClose = () => {
    setImageModal('');
  };

  const openModal = url => {
    setImageModal(url);
  };
  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      {imageModal && <Modal src={imageModal} onClose={modalClose} />}
      {isLoading && <Loader />}
      <ImageGallery hits={hits} openModal={openModal} />;
      <Button onClick={() => handleChangePage()} />
    </div>
  );
};
