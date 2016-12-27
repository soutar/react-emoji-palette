import { PropTypes } from 'react';
import { values } from 'ramda';
import { MODES, SKIN_TONES } from './constants';

export const onEmojiSelect = PropTypes.func;
export const mode = PropTypes.oneOf(values(MODES));
export const skinTone = PropTypes.oneOf(values(SKIN_TONES));
export const codePoints = PropTypes.string;
export const maxUnicodeVersion = PropTypes.number;
export const displayZeroWidthJoins = PropTypes.bool;
