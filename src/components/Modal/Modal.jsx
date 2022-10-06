import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from 'Styles/styles.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ onClose, largeImageURL }) {
  useEffect(() => {
    const closeOnEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', closeOnEsc);
    return () => {
      window.removeEventListener('keydown', closeOnEsc);
    };
  }, [onClose]);

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

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
