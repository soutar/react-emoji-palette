import './Emoji.css';
import React from 'react';
import classNames from 'classnames';
import { MODES } from './constants';
import { mode, codePoints } from './propTypes';
import fromCodePoint from './fromCodePoint';

const NativeEmoji = ({ title, codePoints, className, ...props }) => (
  <span
    { ...props }
    data-codepoints={codePoints}
    data-title={ title }
    className={ classNames(className, 'emoji_palette_native_emoji') }
  >
    {codePoints.split('-').map(fromCodePoint).join('')}
  </span>
);

const Twemoji = ({ title, codePoints, className, ...props }) => (
  <img
    { ...props }
    className={ classNames(className, 'emoji_palette_twemoji') }
    src={`https://abs.twimg.com/emoji/v2/72x72/${codePoints}.png`}
    alt={ title }
  />
);

const Emoji = ({ codePoints, mode, ...props }) => {
  switch (mode) {
    case MODES.NATIVE:
      return <NativeEmoji codePoints={codePoints} {...props} />;
    case MODES.TWEMOJI:
      return <Twemoji codePoints={codePoints} {...props} />;
    default:
      return null;
  }
}

Emoji.PropTypes = {
  codePoints: codePoints.isRequired,
  mode: mode.isRequired
};

export default Emoji;
