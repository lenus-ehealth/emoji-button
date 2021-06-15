import { EMOJI, HIDE_PREVIEW, SHOW_PREVIEW } from './events';
import { save } from './recent';
import { createElement } from './util';
import { render } from './render';

import * as classes from './styles';

import { image } from './icons';

import { PickerUIElement } from './constants';

const placeholder = `<div class="${classes.imagePlaceholder}">${image}</div>`;

export class Emoji {
  constructor(emoji, renderer, showVariants, showPreview, events, options, lazy = true) {
    this.emoji = emoji;
    this.renderer = renderer;
    this.showVariants = showVariants;
    this.showPreview = showPreview;
    this.events = events;
    this.options = options;
    this.lazy = lazy;
  }

  render() {
    this.emojiButton = createElement('button', classes.emoji);

    const content = render(this.emoji, this.renderer, this.lazy && placeholder);

    this.emojiButton.innerHTML = content;
    this.emojiButton.tabIndex = -1;

    this.emojiButton.dataset.emoji = this.emoji.emoji;
    if (this.emoji.custom) {
      this.emojiButton.dataset.custom = 'true';
    }
    this.emojiButton.title = this.emoji.name;

    this.emojiButton.addEventListener('focus', () => this.onEmojiHover());
    this.emojiButton.addEventListener('blur', () => this.onEmojiLeave());
    this.emojiButton.addEventListener('click', () => this.onEmojiClick());
    this.emojiButton.addEventListener('mouseover', () => this.onEmojiHover());
    this.emojiButton.addEventListener('mouseout', () => this.onEmojiLeave());

    // if (this.renderer.lazyLoad && this.lazy) {
    //   this.emojiButton.style.opacity = '0.1';
    // }

    return this.emojiButton;
  }

  onEmojiClick() {
    // TODO move this side effect out of Emoji, make the recent module listen for event
    if (
      (!this.emoji.variations || !this.showVariants || !this.options.uiElements.includes(PickerUIElement.VARIANTS)) &&
      this.options.uiElements.includes(PickerUIElement.RECENTS)
    ) {
      save(this.emoji, this.options);
    }

    this.events.emit(EMOJI, {
      emoji: this.emoji,
      showVariants: this.showVariants,
      button: this.emojiButton
    });
  }

  onEmojiHover() {
    if (this.showPreview) {
      this.events.emit(SHOW_PREVIEW, this.emoji);
    }
  }

  onEmojiLeave() {
    if (this.showPreview) {
      this.events.emit(HIDE_PREVIEW);
    }
  }
}
