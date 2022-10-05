import React, { Component } from 'react';
import css from 'Styles/styles.module.css';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.props.onSubmit(query);
  };

  render() {
    const { query } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>
              <FcSearch />
            </span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            name="query"
            value={query}
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
