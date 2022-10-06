import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from 'Styles/styles.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ onClose, largeImageURL }) {
  useEffect(() => {
    window.addEventListener('keydown', closeOnEsc);
    return () => {
      window.removeEventListener('keydown', closeOnEsc);
    };
    // eslint-disable-next-line
  }, [onClose]);

  const closeOnEsc = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const closeOnClick = e => {
    e.preventDefault();
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={closeOnClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="#" />
      </div>
    </div>,
    modalRoot
  );
}

modalRoot.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
