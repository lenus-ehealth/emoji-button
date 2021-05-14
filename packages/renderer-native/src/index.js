export default class NativeRenderer {
  emit(emoji) {
    return {
      emoji: emoji.emoji,
      name: emoji.name
    };
  }

  render(emoji) {
    return emoji.emoji;
  }
}
