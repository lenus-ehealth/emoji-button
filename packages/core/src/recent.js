const LOCAL_STORAGE_KEY = 'emojiPicker.recent';

export function load() {
  const recentJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  const recents = recentJson ? JSON.parse(recentJson) : [];
  return recents.filter(recent => !!recent.emoji);
}

export function save(emoji, options) {
  const recents = load();

  const recent = {
    emoji: emoji.emoji,
    name: emoji.name,
    key: emoji.key || emoji.name,
    custom: emoji.custom
  };

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(
      [recent, ...recents.filter(r => !!r.emoji && r.key !== recent.key)].slice(
        0,
        options.recentsCount
      )
    )
  );
}
