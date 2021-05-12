import twemoji from 'twemoji';

import { CLASS_CUSTOM_EMOJI } from './classes';

import { createElement } from './util';

export function lazyLoadEmoji(element, options) {
  if (!element.dataset.loaded) {
    if (element.dataset.custom) {
      lazyLoadCustomEmoji(element);
    } else if (options.style === 'twemoji') {
      lazyLoadTwemoji(element, options);
    }

    element.dataset.loaded = 'true';
    element.style.opacity = '1';
  }
}

function lazyLoadCustomEmoji(element) {
  const img = createElement('img', CLASS_CUSTOM_EMOJI);

  if (element.dataset.emoji) {
    img.src = element.dataset.emoji;
    element.innerText = '';
    element.appendChild(img);
  }
}

function lazyLoadTwemoji(element, options) {
  if (element.dataset.emoji) {
    element.innerHTML = twemoji.parse(
      element.dataset.emoji,
      options.twemojiOptions
    );
  }
}
