import './EmojiList.css';
import React from 'react';
import { AutoSizer, List } from 'react-virtualized';
import compose from '../shared/compose';
import modifierFactory from '../shared/modifierFactory';
import createEmojiObject from '../shared/createEmojiObject';
import getTwemojiUrl from '../shared/getTwemojiUrl';
import sum from '../shared/sum';
import Emoji from './Emoji';
import {
  LIST_COLUMN_COUNT,
  ZWJ_CODEPOINT,
  KEYWORDS_PROPERTY,
  DESCRIPTION_PROPERTY,
  MIN_VERSION_PROPERTY,
  VARIANT_EMOJI_MARKER
} from '../shared/constants';
import {
  category,
  categories,
  skinTone,
  displayZeroWidthJoins,
  maxUnicodeVersion,
  mode,
  searchQuery,
  descriptionsAndKeywords,
  onEmojiSelect,
  onScrollToCategory
} from '../shared/propTypes';


const HEADER_HEIGHT = 34;
const ROW_HEIGHT = 30;

const renderHeader = ({ rowIndex, style, listItem }) => (
  <header className='emoji_list__header' key={ rowIndex } style={ style }>
    { listItem.title }
  </header>
);

const renderRow = ({ rowIndex, style, listItem, mode, onEmojiSelect }) => (
  <div className='emoji_list__row' key={ rowIndex } style={ style }>
    { listItem.emojis.map(({ codePoints, data }, columnIndex) => {
      const url = getTwemojiUrl(codePoints);
      const callbackObject = createEmojiObject({ codePoints, data, url });
      const onClick = () => onEmojiSelect(callbackObject);
      return (
        <div className='emoji_list__emoji' key={ `${columnIndex}_${rowIndex}` } style={ {
          top: 0, bottom: 0,
          left: `${(100/LIST_COLUMN_COUNT) * columnIndex}%`,
          width: `${100/LIST_COLUMN_COUNT}%`
        } }>
          <button className='emoji_list__button' tabIndex={0} onClick={ onClick }>
            <Emoji title={ data[DESCRIPTION_PROPERTY] } codePoints={ codePoints } mode={ mode } />
          </button>
        </div>
      );
    }) }
  </div>
);

const EmojiList = ({
  categories,
  activeSkinTone,
  searchQuery,
  maxUnicodeVersion,
  displayZeroWidthJoins,
  mode,
  descriptionsAndKeywords,
  onEmojiSelect,
  onScrollToCategory,
  selectedCategory
}) => {
  const list = categories.reduce((acc, category) => {
    const emojis = category.items.map(
      compose(
        ([ simpleKey, modifiedKey ]) => ({
          codePoints: modifiedKey,
          data: descriptionsAndKeywords[simpleKey]
        }),
        modifierFactory(activeSkinTone),
        key => key.replace(new RegExp(VARIANT_EMOJI_MARKER, 'g'), '')
      )
    ).filter(({ codePoints, data }) => (
      data
      && data[KEYWORDS_PROPERTY].indexOf(searchQuery.toLowerCase()) > -1
      && data[MIN_VERSION_PROPERTY] <= maxUnicodeVersion
      && (displayZeroWidthJoins || codePoints.indexOf(ZWJ_CODEPOINT) === -1)
    ));

    if (emojis.length > 0) {
      const rows = Math.ceil(emojis.length / LIST_COLUMN_COUNT);
      acc.push({ type: 'header', title: category.title, rows });
      for (let row = 0; row < rows; row++) {
        acc.push({
          type: 'row',
          emojis: emojis.slice(
            row*LIST_COLUMN_COUNT,
            row*LIST_COLUMN_COUNT+LIST_COLUMN_COUNT
          )
        });
      }
    }

    return acc;
  }, []);

  const headerPositions = list
    .filter(({ type }) => type === 'header')
    .map(({ rows }) => (ROW_HEIGHT * rows) + HEADER_HEIGHT)
    .map((height, index, heights) => index > 0 ? sum(heights.slice(0, index)) : 0);

  const renderListItem = ({ style, key, index: rowIndex }) => {
    const listItem = list[rowIndex];
    switch (listItem.type) {
      case 'header': return renderHeader({ rowIndex, style, listItem });
      case 'row': return renderRow({ rowIndex, style, listItem, mode, onEmojiSelect });
    }
  };

  const scrollToIndex = selectedCategory && list.findIndex(
    (i) => i.type === 'header' && i.title === selectedCategory.title
  );

  return (
    <AutoSizer className='emoji_list'>
      { (size) => (
        <List
          { ...size }
          rowCount={ list.length }
          rowHeight={ ({ index }) => {
            switch (list[index].type) {
              case 'header': return HEADER_HEIGHT;
              case 'row': return ROW_HEIGHT;
            }
          } }
          rowRenderer={ renderListItem }
          tabIndex={ -1 }
          scrollToIndex={ scrollToIndex }
          scrollToAlignment='start'
          onScroll={ ({ clientHeight, scrollHeight, scrollTop }) => {
            const category = categories[headerPositions.findIndex(
              (position, index, all) => scrollTop >= position && (!all[index + 1] || scrollTop < all[index + 1])
            )];
            onScrollToCategory(category);
          } }
        />
      ) }
    </AutoSizer>
  );
};

EmojiList.propTypes = {
  categories: categories.isRequired,
  activeSkinTone: skinTone.isRequired,
  searchQuery: searchQuery.isRequired,
  maxUnicodeVersion: maxUnicodeVersion,
  displayZeroWidthJoins: displayZeroWidthJoins.isRequired,
  mode: mode.isRequired,
  descriptionsAndKeywords: descriptionsAndKeywords.isRequired,
  onEmojiSelect: onEmojiSelect.isRequired,
  onScrollToCategory: onScrollToCategory.isRequired,
  selectedCategory: category
};

export default EmojiList;
