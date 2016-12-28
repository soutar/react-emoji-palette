import fromCodePoints from './fromCodePoints';
import { CODEPOINT_DELIMITER } from './constants';

export default ({ codePoints, data, url }) => ({
  id: codePoints,
  title: data[0],
  tags: data[1],
  native: fromCodePoints(codePoints),
  url
});
