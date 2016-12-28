import './EmojiList.css';
import React from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import compose from '../shared/compose';
import diversityFactory from '../shared/diversityFactory';
import createEmojiObject from '../shared/createEmojiObject';
import getTwemojiUrl from '../shared/getTwemojiUrl';
import Emoji from './Emoji';
import { LIST_COLUMN_COUNT, ZWJ_CODEPOINT, KEYWORDS_PROPERTY, DESCRIPTION_PROPERTY, MIN_VERSION_PROPERTY } from '../shared/constants';
import { category, skinTone, displayZeroWidthJoins, maxUnicodeVersion, mode, searchQuery, descriptionsAndKeywords, onEmojiSelect } from '../shared/propTypes';

const renderCell = ({
  style, key,
  columnIndex, rowIndex, rowLength,
  emojis, onClick, mode
}) => {
  const emoji = emojis[rowIndex*rowLength + columnIndex];
  if (!emoji) return null;

  const { codePoints, data } =  emoji;
  const description = data[DESCRIPTION_PROPERTY];
  const url = getTwemojiUrl(codePoints);
  const callbackObject = createEmojiObject({ codePoints, data, url });

  return (
    <button
      type='button'
      className='emoji_list__emoji'
      style={ style }
      title={ description }
      key={ key }
      onClick={ () => onClick(callbackObject) }
    >
      <Emoji
        title={ description }
        codePoints={ codePoints }
        mode={ mode }
      />
    </button>
  );
};

const EmojiList = ({
  category,
  activeSkinTone,
  searchQuery,
  maxUnicodeVersion,
  displayZeroWidthJoins,
  mode,
  descriptionsAndKeywords,
  onEmojiSelect
}) => {
  const emojis = category.items.map(
    compose(
      ([ originalKey, diverseKey ]) => ({
        codePoints: diverseKey,
        data: descriptionsAndKeywords[originalKey]
      }),
      diversityFactory(activeSkinTone),
      key => key.replace(/=/g, '')
    )
  ).filter(
    ({ codePoints, data }) => (
      data
      && data[KEYWORDS_PROPERTY].indexOf(searchQuery) > -1
      && data[MIN_VERSION_PROPERTY] <= maxUnicodeVersion
      && (displayZeroWidthJoins || codePoints.indexOf(ZWJ_CODEPOINT) === -1)
    )
  );

  return (
    <section className='emoji_list'>
      <header className='emoji_list__header'>{ category.title }</header>
      <div className='emoji_list__items'>
        <AutoSizer key={category.title}>
          {({ width, height }) => (
            <Grid
              cellRenderer={(opts) => renderCell({
                rowLength: LIST_COLUMN_COUNT,
                emojis,
                descriptionsAndKeywords,
                onClick: onEmojiSelect,
                mode,
                ...opts
              })}
              columnCount={ LIST_COLUMN_COUNT }
              rowHeight={ width / LIST_COLUMN_COUNT }
              columnWidth={ width / LIST_COLUMN_COUNT }
              height={ height }
              width={ width }
              rowCount={ Math.ceil(emojis.length / LIST_COLUMN_COUNT) }
              tabIndex={0}
            />
          )}
        </AutoSizer>
      </div>
    </section>
  );
};

EmojiList.propTypes = {
  category: category.isRequired,
  activeSkinTone: skinTone.isRequired,
  searchQuery: searchQuery.isRequired,
  maxUnicodeVersion: maxUnicodeVersion,
  displayZeroWidthJoins: displayZeroWidthJoins.isRequired,
  mode: mode.isRequired,
  descriptionsAndKeywords: descriptionsAndKeywords.isRequired,
  onEmojiSelect: onEmojiSelect.isRequired
};

export default EmojiList;
