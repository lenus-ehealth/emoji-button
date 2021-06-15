import * as classes from './styles';

import { createElement } from './util';

import { image } from './icons';

export function emit(emoji) {
  return {
    url: emoji.emoji,
    name: emoji.name,
    custom: true
  };
}

export function renderCustom(emoji, lazy) {
  return lazy ? `<div class="${classes.imagePlaceholder}">${image}</div>` : `<img class="${classes.customEmoji}" src="${emoji.emoji}">`;
}

export function lazyLoadCustom(element) {
  if (element.dataset.emoji) {
    const img = createElement('img', classes.customEmoji);
    img.src = element.dataset.emoji;
    element.innerText = '';
    element.appendChild(img);
  }
}
