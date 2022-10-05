import React from 'react';
import css from 'Styles/styles.module.css';

export default function Loader() {
  return (
    <div className={css.Backdrop}>
      <div className={css.Loader}></div>
    </div>
  );
}
