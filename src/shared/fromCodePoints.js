import { CODEPOINT_DELIMITER } from './constants';
import fromCodePoint from './fromCodePoint';

export default (codepoints) => codepoints
  .split(CODEPOINT_DELIMITER)
  .map(fromCodePoint)
  .join('');
