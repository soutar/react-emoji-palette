import React, { PropTypes } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import EmojiPalette, { MODES } from '../';

const onEmojiSelect = action('onEmojiSelect');

storiesOf('EmojiPalette', module)
  .addDecorator((story) => (
    <div style={{ padding: 20 }}>
      {story()}
    </div>
  )).add('Native emoji (no max unicode version, displaying zero-width-joins)', () => (
    <EmojiPalette
      mode={MODES.NATIVE}
      maxUnicodeVersion={Infinity}
      onEmojiSelect={onEmojiSelect}
    />
  ))
  .add('Native emoji (max unicode version 8.0)', () => (
    <EmojiPalette
      mode={MODES.NATIVE}
      maxUnicodeVersion={8}
      onEmojiSelect={onEmojiSelect}
    />
  ))
  .add('Native emoji (max unicode version 7.0)', () => (
    <EmojiPalette
      mode={MODES.NATIVE}
      maxUnicodeVersion={7}
      onEmojiSelect={onEmojiSelect}
    />
  ))
  .add('Native emoji (max unicode version 6.0)', () => (
    <EmojiPalette
      mode={MODES.NATIVE}
      maxUnicodeVersion={7}
      onEmojiSelect={onEmojiSelect}
    />
  ))
  .add('Twemoji (no max unicode version, displaying zero-width-joins)', () => (
    <EmojiPalette
      mode={MODES.TWEMOJI}
      maxUnicodeVersion={Infinity}
      displayZeroWidthJoins={true}
      onEmojiSelect={onEmojiSelect}
    />
  ));
