import { CLASS_CATEGORY_BUTTONS, CLASS_CATEGORY_BUTTON } from './classes';

import { CATEGORY_CLICKED } from './events';

import { EmojiCategory, PickerUIElement } from './constants';

import * as icons from './icons';
import { createElement } from './util';

export const categoryIcons = {
  [EmojiCategory.RECENTS]: icons.history,
  [EmojiCategory.SMILEYS]: icons.smile,
  [EmojiCategory.PEOPLE]: icons.user,
  [EmojiCategory.ANIMALS]: icons.cat,
  [EmojiCategory.FOOD]: icons.coffee,
  [EmojiCategory.ACTIVITIES]: icons.futbol,
  [EmojiCategory.TRAVEL]: icons.building,
  [EmojiCategory.OBJECTS]: icons.lightbulb,
  [EmojiCategory.SYMBOLS]: icons.music,
  [EmojiCategory.FLAGS]: icons.flag,
  [EmojiCategory.CUSTOM]: icons.icons
};

export class CategoryButtons {
  constructor(options, events, i18n) {
    this.options = options;
    this.events = events;
    this.i18n = i18n;

    this.activeButton = 0;
    this.buttons = [];
  }

  render() {
    const container = createElement('div', CLASS_CATEGORY_BUTTONS);

    const categoryData = this.options.categories || this.options.emojiData?.categories;

    let categories = this.options.uiElements.includes(PickerUIElement.RECENTS)
      ? [EmojiCategory.RECENTS, ...categoryData]
      : categoryData;

    if (this.options.custom) {
      categories = [...categories, EmojiCategory.CUSTOM];
    }

    categories.forEach(category => {
      const button = createElement('button', CLASS_CATEGORY_BUTTON);

      if (this.options.icons && this.options.icons.categories && this.options.icons.categories[category]) {
        button.appendChild(icons.createIcon(this.options.icons.categories[category]));
      } else {
        button.innerHTML = categoryIcons[category] || icons.smile;
      }

      button.tabIndex = -1;
      button.title = this.i18n.categories[category];
      container.appendChild(button);
      this.buttons.push(button);

      button.addEventListener('click', () => {
        this.events.emit(CATEGORY_CLICKED, category);
      });
    });

    container.addEventListener('keydown', event => {
      switch (event.key) {
        case 'ArrowRight':
          this.events.emit(CATEGORY_CLICKED, categories[(this.activeButton + 1) % this.buttons.length]);
          break;
        case 'ArrowLeft':
          this.events.emit(
            CATEGORY_CLICKED,
            categories[this.activeButton === 0 ? this.buttons.length - 1 : this.activeButton - 1]
          );
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          event.stopPropagation();
          event.preventDefault();
      }
    });

    return container;
  }

  setActiveButton(activeButton, focus = true) {
    let activeButtonEl = this.buttons[this.activeButton];
    activeButtonEl.classList.remove('active');
    activeButtonEl.tabIndex = -1;

    this.activeButton = activeButton;

    activeButtonEl = this.buttons[this.activeButton];
    activeButtonEl.classList.add('active');
    activeButtonEl.tabIndex = 0;

    if (focus) {
      activeButtonEl.focus();
    }
  }
}
