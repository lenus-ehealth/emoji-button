export function createElement(tagName, className) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  return element;
}

export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function formatEmojiName(name) {
  const words = name.split(/[-_]/);
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);

  return words.join(' ');
}

export function buildEmojiCategoryData(emojiData, categoryData) {
  const emojiCategories = {};

  emojiData.forEach(emoji => {
    let categoryList = emojiCategories[categoryData[emoji.category].key];
    if (!categoryList) {
      categoryList = emojiCategories[categoryData[emoji.category].key] = [];
    }

    categoryList.push(emoji);
  });

  return emojiCategories;
}

export function bindMethods(context, methods) {
  methods.forEach(method => {
    context[method] = context[method].bind(context);
  });
}
