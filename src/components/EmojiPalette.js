import './EmojiPalette.css';
import React, { Component } from 'react';
import EmojiCategoryList from './EmojiCategoryList';
import EmojiSearch from './EmojiSearch';
import EmojiList from './EmojiList';
import EmojiSkinToneSelector from './EmojiSkinToneSelector';
import { SKIN_TONES, MODES } from '../shared/constants';
import { onEmojiSelect, mode, maxUnicodeVersion, displayZeroWidthJoins } from '../shared/propTypes';

const placeholderCategories = [
  { id: 'recent', title: 'Recently used' },
  { id: 'people', title: 'Smileys & people' },
  { id: 'nature', title: 'Animals & nature' },
  { id: 'food', title: 'Food & drink' },
  { id: 'activity', title: 'Activity' },
  { id: 'travel', title: 'Travel & places' },
  { id: 'objects', title: 'Objects' },
  { id: 'symbols', title: 'Symbols' },
  { id: 'flags', title: 'Flags' }
];

export default class EmojiPalette extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      searchQuery: '',
      categories: placeholderCategories,
      descriptionsAndKeywords: {},
      activeCategory: placeholderCategories[1],
      skinTone: SKIN_TONES.NO_SKIN_TONE
    };
  }
  componentDidMount () {
    require.ensure([], require => {
      const emojiData = require('../data/emoji.json');
      const categories = emojiData.categories.map(
        category => ({
          id: category.id,
          title: category.title,
          items: category.items.split(' ')
        })
      );
      this.setState({
        loading: false,
        categories: categories,
        activeCategory: categories[1],
        descriptionsAndKeywords: emojiData.descriptionsAndKeywords
      });
    });
  }
  render () {
    return (
      <div className='emoji_palette'>
        <EmojiCategoryList
          className='emoji_palette__categories'
          categories={ this.state.categories.filter(c => c.id !== 'recent') }
          activeCategory={ this.state.activeCategory }
          onCategorySelect={ (category) => this.setState({ activeCategory: category }) }
        />
        <div className='emoji_palette__main'>
          <EmojiSearch
            className='emoji_palette__search'
            onQueryChange={ (query) => this.setState({ searchQuery: query }) }
          />
          <div className='emoji_palette__results'>
            { this.state.loading
              ? <Loading />
              : (
                <EmojiList
                  mode={ this.props.mode }
                  activeSkinTone={ this.state.skinTone }
                  categories={ this.state.categories.filter(c => c.id !== 'recent') }
                  descriptionsAndKeywords={ this.state.descriptionsAndKeywords }
                  searchQuery={ this.state.searchQuery }
                  onEmojiSelect={ this.props.onEmojiSelect }
                  maxUnicodeVersion={ this.props.maxUnicodeVersion }
                  displayZeroWidthJoins={ this.props.displayZeroWidthJoins }
                />
              ) }
          </div>
          <EmojiSkinToneSelector
            activeSkinTone={ this.state.skinTone }
            onSkinToneSelect={ (skinTone) => this.setState({ skinTone }) }
          />
        </div>
      </div>
    );
  }
}

const Loading = () => <span>Loading</span>;

EmojiPalette.propTypes = {
  onEmojiSelect: onEmojiSelect.isRequired,
  maxUnicodeVersion,
  displayZeroWidthJoins,
  mode
};

EmojiPalette.defaultProps = {
  mode: MODES.NATIVE,
  maxUnicodeVersion: 8,
  displayZeroWidthJoins: false
};
