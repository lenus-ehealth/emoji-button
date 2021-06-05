import './index.css';
import '@emoji-button/core/css/emoji-button.css';

// import compactEmojis from 'emojibase-data/en/compact.json';

import { EmojiButton } from '@emoji-button/core';
import NativeRenderer from '@emoji-button/renderer-native';
import TwemojiRenderer from '@emoji-button/renderer-twemoji';
import emojiData from '@emoji-button/emoji-data/dist/en';

document.querySelector('#version').innerHTML = `v${EmojiButton.version}`;

// console.log(compactEmojis);

// console.log(categories);

function createPicker(button, options, onEmoji) {
  const picker = new EmojiButton(options);
  picker.on('emoji', data => {
    onEmoji(data);
  });
  button.addEventListener('click', () => picker.togglePicker(button));
}

const native = document.querySelector('#native .emoji-button');
createPicker(
  native,
  {
    showRecents: false,
    emojiData,
    renderer: new NativeRenderer()
  },
  ({ emoji }) => {
    native.innerHTML = emoji;
  }
);

// const twemoji = document.querySelector('#twemoji .emoji-button');
// createPicker(
//   twemoji,
//   {
//     emojiData,
//     renderer: new TwemojiRenderer()
//   },
//   ({ url }) => {
//     twemoji.innerHTML = `<img src="${url}" />`;
//   }
// );
