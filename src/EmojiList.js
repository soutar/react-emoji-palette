import './EmojiList.css';
import React from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import { compose } from 'ramda';
import diversityFactory from './diversityFactory';
import createEmojiObject from './createEmojiObject';
import Emoji from './Emoji';

const COLUMN_COUNT = 7;

const renderCell = ({
  style, key,
  columnIndex, rowIndex, rowLength,
  emojis, onClick, mode
}) => {
  const emoji = emojis[rowIndex*rowLength + columnIndex];
  if (!emoji) return null;

  const { codePoints, data } =  emoji;
  const { description } = data;
  const url = `https://abs.twimg.com/emoji/v2/72x72/${codePoints}.png`;
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

const EmojiList = ({ activeSkinTone, category, descriptionsAndKeywords, searchQuery, maxUnicodeVersion, displayZeroWidthJoins, onEmojiSelect, mode }) => {
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
      && data.keywords.indexOf(searchQuery) > -1
      && data.minVersion <= maxUnicodeVersion
      && (displayZeroWidthJoins || codePoints.indexOf('200d') === -1)
    )
  );

  console.log(emojis);



  return (
    <section className='emoji_list'>
      <header className='emoji_list__header'>{ category.title }</header>
      <div className='emoji_list__items'>
        <AutoSizer key={category.title}>
          {({ width, height }) => (
            <Grid
              cellRenderer={(opts) => renderCell({
                rowLength: COLUMN_COUNT,
                emojis,
                descriptionsAndKeywords,
                onClick: onEmojiSelect,
                mode,
                ...opts
              })}
              columnCount={ COLUMN_COUNT }
              rowHeight={ width / COLUMN_COUNT }
              columnWidth={ width / COLUMN_COUNT }
              height={ height }
              width={ width }
              rowCount={ Math.ceil(emojis.length / COLUMN_COUNT) }
              tabIndex='0'
            />
          )}
        </AutoSizer>
      </div>
    </section>
  );
};

export default EmojiList;
