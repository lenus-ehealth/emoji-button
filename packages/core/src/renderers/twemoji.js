import twemoji from 'twemoji';
import * as custom from './custom';

import { smile } from '../icons';

export function emit(emoji, options) {
  return new Promise(resolve => {
    if (emoji.custom) {
      return resolve(custom.emit(emoji));
    }

    twemoji.parse(emoji.emoji, {
      ...options.twemojiOptions,
      callback(icon, { base, size, ext }) {
        const imageUrl = `${base}${size}/${icon}${ext}`;
        resolve({
          url: imageUrl,
          emoji: emoji.emoji,
          name: emoji.name
        });

        return imageUrl;
      }
    });
  });
}

export function render(emoji, lazy, options) {
  if (emoji.custom) {
    return custom.render(emoji, lazy);
  }

  return lazy ? smile : twemoji.parse(emoji.emoji, options);
}

export function lazyLoad(element, options) {
  if (element.dataset.custom) {
    custom.lazyLoad(element);
  } else if (element.dataset.emoji) {
    element.innerHTML = twemoji.parse(element.dataset.emoji, options);
  }
}
