import { PropTypes } from 'react';
import { values } from 'ramda';
import { MODES, SKIN_TONES } from './constants';

export const callback = PropTypes.func;
export const onEmojiSelect = callback;
export const onSkinToneSelect = callback;
export const onCategorySelect = callback;

export const descriptionsAndKeywords = PropTypes.objectOf(
  PropTypes.shape({
    description: PropTypes.string,
    keywords: PropTypes.string,
    minVersion: PropTypes.number
  })
);
export const category = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string
});
export const categories = PropTypes.arrayOf(category);
export const mode = PropTypes.oneOf(values(MODES));
export const skinTone = PropTypes.oneOf(values(SKIN_TONES));
export const searchQuery = PropTypes.string;

export const codePoints = PropTypes.string;
export const maxUnicodeVersion = PropTypes.number;
export const displayZeroWidthJoins = PropTypes.bool;
