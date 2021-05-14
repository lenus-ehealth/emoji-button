import '@emoji-button/core/css/emoji-button.css';

import { EmojiButton } from '@emoji-button/core';
import * as NativeRenderer from '@emoji-button/renderer-native';

const picker = new EmojiButton({
  renderer: NativeRenderer
});

const trigger = document.querySelector('.trigger');

picker.on('emoji', emoji => {
  console.log(emoji);
});

trigger.addEventListener('click', () => {
  picker.togglePicker(trigger);
});
