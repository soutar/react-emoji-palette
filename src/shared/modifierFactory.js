import {
  VARIANT_CODEPOINT,
  CODEPOINT_DELIMITER,
  DIVERSE_EMOJI_MARKER
} from './constants';

// export default (skinTone) => (emojiKey) => {
//   const simpleKey = emoji.replace(DIVERSE_EMOJI_MARKER, '').replace(VARIANT_EMOJI_MARKER, '');
//   const isVariant = emojiKey.indexOf(VARIANT_EMOJI_MARKER) === -1;
//   const isDiverse = emojiKey.slice(-1) === DIVERSE_EMOJI_MARKER;
//
//   if (!isVariant && (!skinTone || !isDiverse)) {
//     return [simpleKey, simpleKey];
//   }
//
//   if (isDiverse) {
//
//   }
// };

export default (skinTone) => (emoji) => {
  const stripped = emoji.replace(DIVERSE_EMOJI_MARKER, '');
  if (!skinTone) {
    return [stripped, stripped];
  }
  // diverse emoji end in *
  if (emoji.slice(-1) === DIVERSE_EMOJI_MARKER) {
    const parts = stripped.split(CODEPOINT_DELIMITER);
    let diverse;
    // if there are multiple characters comprising this emoji, make the second
    // part the skin tone
    if (parts.length > 1) {
      // if the existing second part is a variant, replace it with skin tone
      if (parts[1] === VARIANT_CODEPOINT) {
        parts[1] = skinTone;
      // otherwise insert the skin tone
      } else {
        parts.splice(1, 0, skinTone);
      }
      diverse = parts.join(CODEPOINT_DELIMITER);
    // otherwise just replace the * with the skin tone
    } else {
      diverse = emoji.replace(DIVERSE_EMOJI_MARKER, `${CODEPOINT_DELIMITER}${skinTone}`);
    }

    return [stripped, diverse];
  }

  return [stripped, stripped];
};
