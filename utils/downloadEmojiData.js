const fs = require('fs');
const fetch = require('node-fetch');
const ramda = require('ramda');

const define = (a, b, module) => {
  const mod = {};
  const require = () => (arg) => arg;
  module(mod, require, {});
  return mod.exports;
};

module.exports = () => {
  return fetch('https://abs.twimg.com/c/swift/en-gb/bundle/emoji_info.f5e4aa822d40aede1486814690bbec5dd103ebdf.js').then(
    res => res.text()
  ).then(
    code => eval(code)
  ).then(
    emojiData => Object.assign({}, emojiData, {
      descriptionsAndKeywords: ramda.mapObjIndexed(
        (data, key) => ({
          d: data[0],
          k: data[1]
        }),
        emojiData.descriptionsAndKeywords
      )
    })
  );
};
