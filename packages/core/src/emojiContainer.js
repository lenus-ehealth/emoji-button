import { renderEmoji } from './emoji';

import renderTemplate from './renderTemplate';

const template = '<div class="{{classes.emojiContainer}}"></div>';

export class EmojiContainer {
  constructor(emojis, renderer, showVariants, events, options, lazy = true) {
    this.showVariants = showVariants;
    this.events = events;
    this.options = options;
    this.lazy = lazy;
    this.renderer = renderer;

    this.emojis = emojis.filter(e => !e.version || parseFloat(e.version) <= parseFloat(options.emojiVersion));
  }

  render() {
    const emojiContainer = renderTemplate(template);

    this.emojis.forEach(emoji =>
      emojiContainer.appendChild(
        renderEmoji(emoji, this.renderer, this.showVariants, true, this.events, this.lazy)
      )
    );

    return emojiContainer;
  }
}
