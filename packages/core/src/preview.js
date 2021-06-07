import { SHOW_PREVIEW, HIDE_PREVIEW } from './events';
import { createElement } from './util';

import { render } from './render';

import { CLASS_PREVIEW, CLASS_PREVIEW_EMOJI, CLASS_PREVIEW_NAME } from './classes';

export class EmojiPreview {
  constructor(events, renderer, options) {
    this.events = events;
    this.renderer = renderer;
    this.options = options;
  }

  render() {
    const preview = createElement('div', CLASS_PREVIEW);

    this.emoji = createElement('div', CLASS_PREVIEW_EMOJI);
    preview.appendChild(this.emoji);

    this.name = createElement('div', CLASS_PREVIEW_NAME);
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
