import './EmojiSearch.css';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Clear from 'react-icons/lib/md/clear';

const clearAndFocus = (input, cb) => {
  input.value = '';
  input.focus();
  cb();
};

const EmojiSearch = ({ className, onQueryChange }) => {
  let input;
  return (
    <div className={ classNames( className, 'emoji_search' ) }>
      <input
        ref={ i => input = i }
        className='emoji_search__query'
        type='text'
        placeholder='Search for emoji'
        onChange={ (e) => onQueryChange(e.target.value) }
      />
      <button
        className='emoji_search__clear'
        type='button'
        title='Clear search query'
        onClick={ () => clearAndFocus(
          input,
          () => onQueryChange('')
        ) }
      >
        <Clear size={16} />
      </button>
    </div>
  );
};

EmojiSearch.propTypes = {
  onQueryChange: PropTypes.func
};

export default EmojiSearch;
