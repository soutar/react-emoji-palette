import './Emoji.css';
import React from 'react';
import classNames from 'classnames';
import { MODES } from './constants';
import { mode, codePoints } from './propTypes';
import fromCodePoints from './fromCodePoints';
import getTwemojiUrl from './getTwemojiUrl';

const NativeEmoji = ({ title, codePoints, className, ...props }) => (
  <span
    { ...props }
    data-codepoints={codePoints}
    data-title={ title }
    className={ classNames(className, 'emoji_palette_native_emoji') }
  >
    {fromCodePoints(codePoints)}
  </span>
);

const Twemoji = ({ title, codePoints, className, ...props }) => (
  <img
    { ...props }
    className={ classNames(className, 'emoji_palette_twemoji') }
    src={ getTwemojiUrl(codePoints) }
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
