import './EmojiSkinToneSelector.css';
import React/*, { PropTypes }*/ from 'react';
import classNames from 'classnames';
import Tick from 'react-icons/lib/md/done';

import { SKIN_TONES, SKIN_TONE_TITLES } from './constants';

const EmojiSkinToneSelector = ({ className, activeSkinTone, onSkinToneSelect }) => (
  <div className={ classNames(className, 'emoji_skin_tone_selector') }>
    {Object.keys(SKIN_TONES).map(skinTone => (
      <label
        key={ skinTone }
        htmlFor={ `EMOJI_SKIN_TONE_${skinTone}` }
        className={ classNames(
          'emoji_skin_tone_selector__tone',
          `emoji_skin_tone_selector__tone--${skinTone.toLowerCase()}`,
        ) }
      >
        { activeSkinTone === SKIN_TONES[skinTone]
          ? <Tick color='white' size={15} />
          : null }
        <input
          key={ skinTone }
          className='emoji_skin_tone_selector__input'
          type='radio'
          name='skin-tone'
          id={ `EMOJI_SKIN_TONE_${skinTone}` }
          value={ skinTone }
          title={ SKIN_TONE_TITLES[skinTone] }
          onClick={ () => onSkinToneSelect( SKIN_TONES[skinTone] ) }
        />
      </label>
    ))}
  </div>
);

export default EmojiSkinToneSelector;
