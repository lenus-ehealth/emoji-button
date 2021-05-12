import { Emoji } from './emoji';
import { createElement } from './util';

import { CLASS_EMOJI_CONTAINER } from './classes';

export class EmojiContainer {
  constructor(emojis, showVariants, events, options, lazy = true) {
    this.showVariants = showVariants;
    this.events = events;
    this.options = options;
    this.lazy = lazy;

    this.emojis = emojis.filter(
      e =>
        !e.version || parseFloat(e.version) <= parseFloat(options.emojiVersion)
    );
  }

  render() {
    const emojiContainer = createElement('div', CLASS_EMOJI_CONTAINER);
    this.emojis.forEach(emoji =>
      emojiContainer.appendChild(
        new Emoji(
          emoji,
          this.showVariants,
          true,
          this.events,
          this.options,
          this.lazy
        ).render()
      )
    );

    return emojiContainer;
  }
}
