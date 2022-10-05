import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from 'Styles/styles.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ items, clickOnImage }) => {
  return (
    <ul className={css.ImageGallery}>
      {items.map(item => {
        return (
          <ImageGalleryItem
            item={item}
            key={item.id}
            clickOnImage={clickOnImage}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired })
  ),
  clickOnImage: PropTypes.func.isRequired,
};

export default ImageGallery;
