const VARIANT = 'fe0f';

export default (skinTone) => (emoji) => {
  const stripped = emoji.replace('*', '').replace('=', '');
  if (!skinTone) {
    return [stripped, stripped];
  }
  // diverse emoji end in *
  if (emoji.slice(-1) === '*') {
    const parts = stripped.split('-');
    let diverse;
    // if there are multiple characters comprising this emoji, make the second
    // part the skin tone
    if (parts.length > 1) {
      // if the existing second part is a variant, replace it with skin tone
      if (parts[1] === VARIANT) {
        parts[1] = skinTone;
      // otherwise insert the skin tone
      } else {
        parts.splice(1, 0, skinTone);
      }
      diverse = parts.join('-');
    // otherwise just replace the * with the skin tone
    } else {
      diverse = emoji.replace('*', `-${skinTone}`);
    }

    return [stripped, diverse];
  }

  return [stripped, stripped];
};
