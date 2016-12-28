# react-emoji-palette
A React clone of Twitter's emoji picker, supporting both native rendering and Twemoji. **This component is unfinished and should be considered early alpha.**

![](https://github.com/soutar/react-emoji-palette/blob/master/react-emoji-palette.gif)

### Props

* **onEmojiSelect** (function, *required*)
  * A callback function to be called when an emoji is pressed
* **mode** (string - NATIVE, TWEMOJI, `NATIVE` by default)
  * The mode to use to render emoji. Selecting native will use unicode and Twemoji will use images hosted remotely by Twitter.
* **maxUnicodeVersion** (number, `8` by default)
  * The maximum unicode version you want to display emoji from. At the time of writing, latest Mac OS supports (most of) 8 and latest iOS supports 9. This can be set to `Infinity` if using Twemoji.
* **displayZeroWidthJoins** (boolean, `false` by default)
  * Even though Mac OS supports Unicode 8, it is missing some characters which use [zero-width-joins](http://unicode.org/emoji/charts/emoji-zwj-sequences.html). Set this prop to false to disable emoji formed using zwj sequences.

### Usage

```js
import React from 'react';
import EmojiPalette, { MODES } from 'react-emoji-palette';

const MyComponent = () => (
    <EmojiPalette
        onEmojiSelect={ (emoji) => console.log(emoji) } // required
        mode={MODES.TWEMOJI} // optional, default is NATIVE
        maxUnicodeVersion={9} // optional, default is 8
        displayZeroWidthJoins={true} // optional, default is false
    />
);

```
### Missing features:

* No recent emoji section
* Unable to scroll between categories (see Twitter's picker)
* Category bar does not respect mode (native vs. twemoji)
* More

### Important resources for working with emoji
* http://www.unicode.org/emoji/charts/index.html
* http://www.unicode.org/Public/UNIDATA/
