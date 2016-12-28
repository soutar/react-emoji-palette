'use strict';

const fetch = require('node-fetch');
const range = require('array-range');
const ramda = require('ramda');

const format = (text) => text
  .split('\n')
  .filter(line => Boolean(line) && line.slice(0, 1) !== '#')
  .map(line => {
    const parts = line.split(/(#|;)/).filter(x => x !== '#' && x !== ';').map(x => x.trim());
    const codepoint = parts[0];
    const version = parts[parts.length-1].split(/(?:\[|\s)/)[0];
    return [codepoint, version];
  });

module.exports = () => {
  return Promise.all([
    fetch('http://www.unicode.org/Public/emoji/4.0//emoji-data.txt').then(r => r.text()).then(format),
    fetch('http://www.unicode.org/Public/emoji/4.0//emoji-sequences.txt').then(r => r.text()).then(format),
    fetch('http://www.unicode.org/Public/emoji/4.0//emoji-zwj-sequences.txt').then(r => r.text()).then(format)
  ]).then(responses => {
    let valid = [];
    const emojis = [].concat(responses[0], responses[1], responses[2]);
    return emojis.reduce(
      (acc, emoji) => {
        const version = parseFloat(emoji[1]);
        const codepoints = emoji[0].match(/^([^\.]+)(?:..([^\.]+))?$/).slice(1).filter(Boolean);
        switch (codepoints.length) {
          case 1:
            acc[codepoints[0].toLowerCase().replace(/ /g, '-')] = version;
          break;
          case 2:
            range(
              parseInt(codepoints[0], 16),
              parseInt(codepoints[1], 16) + 1
            ).forEach(point => {
              acc[point.toString(16).toLowerCase()] = version;
            });
          break;
        }
        return acc;
      },
      {}
    );
  }).catch(
    e => console.log(e)
  );
};
