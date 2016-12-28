import './EmojiCategoryList.css';
import React from 'react';
import classNames from 'classnames';
import { categories, category, onCategorySelect } from './propTypes';

const EmojiCategoryList = ({ className, categories, activeCategory, onCategorySelect }) => (
  <div className={ classNames( className, 'emoji_category_list' ) }>
    { categories.map((category, index) => (
      <button
        key={ category.id }
        type='button'
        className={ classNames(
          'emoji_category_list__category',
          `emoji_category_list__category--${category.id}`,
          { 'emoji_category_list__category--active': activeCategory.id === category.id }
        ) }
        title={ category.title }
        onClick={ () => onCategorySelect(category) }
      />
    )) }
  </div>
);

EmojiCategoryList.propTypes = {
 categories: categories.isRequired,
 activeCategory: category.isRequired,
 onCategorySelect: onCategorySelect.isRequired
};

export default EmojiCategoryList;
