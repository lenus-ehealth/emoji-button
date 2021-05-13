import * as custom from './custom';

export async function emit(emoji) {
  if (emoji.custom) {
    return custom.emit(emoji);
  }

  return {
    emoji: emoji.emoji,
    name: emoji.name
  };
}

export function render(emoji, lazy) {
  if (emoji.custom) {
    return custom.render(emoji, lazy);
  }

  return emoji.emoji;
}

export function lazyLoad(element) {
  if (element.dataset.custom) {
    custom.lazyLoad(element);
  }
}
