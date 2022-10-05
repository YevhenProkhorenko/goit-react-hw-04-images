import React from 'react';
import css from 'Styles/styles.module.css';
import PropTypes from 'prop-types';

const Button = ({ text, onClick }) => {
  return (
    <div className={css.buttonWrapper}>
      <button className={css.Button} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};
export default Button;
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
