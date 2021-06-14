import { SHOW_PREVIEW, HIDE_PREVIEW } from './events';
import { createElement } from './util';

import classes from '../css/index.css';

import { render } from './render';

export class EmojiPreview {
  constructor(events, renderer, options) {
    this.events = events;
    this.renderer = renderer;
    this.options = options;
  }

  render() {
    const preview = createElement('div', classes.preview);

    this.emoji = createElement('div', classes.previewEmoji);
    preview.appendChild(this.emoji);

    this.name = createElement('div', classes.previewName);
    preview.appendChild(this.name);

    this.events.bindEvents(
      {
        [SHOW_PREVIEW]: this.showPreview,
        [HIDE_PREVIEW]: this.hidePreview
      },
      this
    );

    return preview;
  }

  showPreview(emoji) {
    this.emoji.innerHTML = render(emoji, this.renderer);
    this.name.innerHTML = emoji.name;
  }

  hidePreview() {
    this.emoji.innerHTML = '';
    this.name.innerHTML = '';
  }
}
