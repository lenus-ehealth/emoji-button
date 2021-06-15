import { Emoji } from './emoji';
import { createElement } from './util';

import * as classes from './styles';

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
    const emojiContainer = createElement('div', classes.emojiContainer);
    this.emojis.forEach(emoji =>
      emojiContainer.appendChild(
        new Emoji(emoji, this.renderer, this.showVariants, true, this.events, this.options, this.lazy).render()
      )
    );

    return emojiContainer;
  }
}
