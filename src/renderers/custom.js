import { CLASS_CUSTOM_EMOJI } from '../classes';

import { createElement } from '../util';

import { smile } from '../icons';

export function emit(emoji) {
  return {
    url: emoji.emoji,
    name: emoji.name,
    custom: true
  };
}

export function render(emoji, lazy) {
  return lazy
    ? smile
    : `<img class="${CLASS_CUSTOM_EMOJI}" src="${emoji.emoji}">`;
}

export function lazyLoad(element) {
  if (element.dataset.emoji) {
    const img = createElement('img', CLASS_CUSTOM_EMOJI);
    img.src = element.dataset.emoji;
    element.innerText = '';
    element.appendChild(img);
  }
}
