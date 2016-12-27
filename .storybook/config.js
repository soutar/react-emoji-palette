import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories/ExampleEmojiPalette');
}

configure(loadStories, module);
