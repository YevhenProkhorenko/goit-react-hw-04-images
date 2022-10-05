import React, { Component } from 'react';
import API from './API/API';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    pictures: [],
    page: 1,
    query: '',
    loading: false,
    modalOpen: false,
    selectedImage: '',
  };

  componentDidMount() {
    this.setState({ query: '' });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchIMG();
    }
  }

  changeQuery = query => {
    if (this.query !== query) {
      this.setState({ query, page: 1 });
    }
  };

  fetchIMG = () => {
    const { page, query } = this.state;

    this.setState({ loading: true });
    try {
      API(query, page)
        .then(data => {
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...data],
            page: prevState.page + 1,
          }));
          console.log(this.state.pictures);
        })
        .finally(() => this.setState({ loading: false }));
    } catch (error) {
      console.log(error);
    }
  };

  toggleModal = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
    }));
  };

  openSelectedImage = largeImageURL => {
    this.setState({ selectedImage: largeImageURL });
    this.toggleModal();
  };

  render() {
    const { pictures, loading, modalOpen, selectedImage } = this.state;
    const { changeQuery, fetchIMG, toggleModal, openSelectedImage } = this;

    const isImages = Boolean(pictures.length);

    return (
      <div>
        <Searchbar onSubmit={changeQuery} />
        {isImages && (
          <ImageGallery items={pictures} clickOnImage={openSelectedImage} />
        )}

        {isImages && <Button onClick={fetchIMG} text={'Load more'} />}
        {loading && <Loader />}
        {modalOpen && (
          <Modal onClose={toggleModal} largeImageURL={selectedImage} />
        )}
      </div>
    );
  }
}
export default App;
