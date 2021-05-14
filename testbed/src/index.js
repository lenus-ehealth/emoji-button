import '@emoji-button/core/css/emoji-button.css';

import { EmojiButton } from '@emoji-button/core';
// import NativeRenderer from '@emoji-button/renderer-native';
import TwemojiRenderer from '@emoji-button/renderer-twemoji';

const picker = new EmojiButton({
  renderer: new TwemojiRenderer()
});

const trigger = document.querySelector('.trigger');

picker.on('emoji', emoji => {
  console.log(emoji);
});

trigger.addEventListener('click', () => {
  picker.togglePicker(trigger);
});
