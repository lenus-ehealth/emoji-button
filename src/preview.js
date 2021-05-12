import twemoji from 'twemoji';

import { SHOW_PREVIEW, HIDE_PREVIEW } from './events';
import { createElement } from './util';

import {
  CLASS_PREVIEW,
  CLASS_PREVIEW_EMOJI,
  CLASS_PREVIEW_NAME,
  CLASS_CUSTOM_EMOJI
} from './classes';

export class EmojiPreview {
  constructor(events, options) {
    this.events = events;
    this.options = options;
  }

  render() {
    const preview = createElement('div', CLASS_PREVIEW);

    this.emoji = createElement('div', CLASS_PREVIEW_EMOJI);
    preview.appendChild(this.emoji);

    this.name = createElement('div', CLASS_PREVIEW_NAME);
    preview.appendChild(this.name);

    this.events.on(SHOW_PREVIEW, emoji => this.showPreview(emoji));
    this.events.on(HIDE_PREVIEW, () => this.hidePreview());

    return preview;
  }

  showPreview(emoji) {
    let content = emoji.emoji;

    if (emoji.custom) {
      content = `<img class="${CLASS_CUSTOM_EMOJI}" src="${emoji.emoji}">`;
    } else if (this.options.style === 'twemoji') {
      content = twemoji.parse(emoji.emoji, this.options.twemojiOptions);
    }

    this.emoji.innerHTML = content;
    this.name.innerHTML = emoji.name;
  }

  hidePreview() {
    this.emoji.innerHTML = '';
    this.name.innerHTML = '';
  }
}
