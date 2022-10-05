import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from 'Styles/styles.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeOnEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeOnEsc);
  }

  closeOnEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  closeOnClick = e => {
    e.preventDefault();
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.closeOnClick}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt="#" />
        </div>
      </div>,
      modalRoot
    );
  }
}

modalRoot.propTypes = {
  onClose: PropTypes.func.isRequired,
};
