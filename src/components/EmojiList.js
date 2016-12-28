import './EmojiList.css';
import React from 'react';
import { AutoSizer, List } from 'react-virtualized';
import compose from '../shared/compose';
import diversityFactory from '../shared/diversityFactory';
import createEmojiObject from '../shared/createEmojiObject';
import getTwemojiUrl from '../shared/getTwemojiUrl';
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
  categories,
  skinTone,
  displayZeroWidthJoins,
  maxUnicodeVersion,
  mode,
  searchQuery,
  descriptionsAndKeywords,
  onEmojiSelect
} from '../shared/propTypes';

const renderHeader = ({ rowIndex, style, listItem }) => (
  <header className='emoji_list__header' key={ rowIndex } style={style}>
    { listItem.title }
  </header>
);

const renderRow = ({ rowIndex, style, listItem, mode, onEmojiSelect }) => (
  <div className='emoji_list__row' key={ rowIndex } style={style}>
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
  onEmojiSelect
}) => {
  const list = categories.reduce((acc, category) => {
    const emojis = category.items.map(
      compose(
        ([ originalKey, diverseKey ]) => ({
          codePoints: diverseKey,
          data: descriptionsAndKeywords[originalKey]
        }),
        diversityFactory(activeSkinTone),
        key => key.replace(new RegExp(VARIANT_EMOJI_MARKER, 'g'), '')
      )
    ).filter(({ codePoints, data }) => (
      data
      && data[KEYWORDS_PROPERTY].indexOf(searchQuery.toLowerCase()) > -1
      && data[MIN_VERSION_PROPERTY] <= maxUnicodeVersion
      && (displayZeroWidthJoins || codePoints.indexOf(ZWJ_CODEPOINT) === -1)
    ));

    if (emojis.length === 0) return acc;

    acc.push({ type: 'header', title: category.title });
    for (let row = 0; row < Math.ceil(emojis.length / LIST_COLUMN_COUNT); row++) {
      acc.push({
        type: 'row',
        emojis: emojis.slice(
          row*LIST_COLUMN_COUNT,
          row*LIST_COLUMN_COUNT+LIST_COLUMN_COUNT
        )
      });
    }

    return acc;
  }, []);

  const renderListItem = ({ style, key, index: rowIndex }) => {
    const listItem = list[rowIndex];
    switch (listItem.type) {
      case 'header': return renderHeader({ rowIndex, style, listItem });
      case 'row': return renderRow({ rowIndex, style, listItem, mode, onEmojiSelect });
    }
  };

  return (
      <AutoSizer className='emoji_list'>
        { (size) => (
          <List
            { ...size }
            rowCount={ list.length }
            rowHeight={ ({ index }) => {
              switch (list[index].type) {
                case 'header': return 34;
                case 'row': return 30;
              }
            } }
            rowRenderer={ renderListItem }
            tabIndex={ -1 }
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
  onEmojiSelect: onEmojiSelect.isRequired
};

export default EmojiList;
