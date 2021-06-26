import { findByClass } from './util';

import * as classes from './styles';

import { renderCategoryButtons, CategoryButtons, categoryIcons } from './categoryButtons';
import { EmojiContainer } from './emojiContainer';

import { CATEGORY_CLICKED, SET_ACTIVE_CATEGORY } from './events';

import { createElement, bindMethods, findAllByClass } from './util';
import { getRecents } from './recent';
import { PickerUIElement, EmojiCategory } from './constants';

export class EmojiArea {
  constructor(events, renderer, i18n, options) {
    this.events = events;
    this.i18n = i18n;
    this.options = options;

    this.renderer = renderer;

    this.headers = [];
    this.focusedIndex = 0;
    this.currentCategory = 0;

    this.emojisPerRow = options.emojisPerRow;
    this.categories = this.options.categories;

    this.showCategoryButtons = options.uiElements.includes(PickerUIElement.CATEGORY_BUTTONS);

    bindMethods(this, ['highlightCategory']);

    if (options.uiElements.includes(PickerUIElement.RECENTS)) {
      this.categories = [EmojiCategory.RECENTS, ...this.categories];
    }

    if (options.custom) {
      this.categories = [...this.categories, EmojiCategory.CUSTOM];
    }
  }

  updateRecents() {
    if (this.options.uiElements.includes(PickerUIElement.RECENTS)) {
      this.recents = getRecents(this.options);
      const recentsContainer = findByClass(this.emojis, classes.emojiContainer);
      if (recentsContainer?.parentNode) {
        recentsContainer.parentNode.replaceChild(
          new EmojiContainer(this.recents, this.renderer, true, this.events, this.options, false).render(),
          recentsContainer
        );
      }
    }
  }

  render() {
    this.container = createElement('div');

    if (this.showCategoryButtons) {
      this.container.appendChild(renderCategoryButtons(this.options, this.events, this.i18n));
    }

    this.emojis = createElement('div', classes.emojis);

    if (this.options.uiElements.includes(PickerUIElement.RECENTS)) {
      this.recents = getRecents(this.options);
    }

    if (this.options.custom) {
      this.custom = this.options.custom.map(custom => ({
        ...custom,
        custom: true
      }));
    }

    this.categories.forEach(category => {
      if (category === EmojiCategory.RECENTS) {
        this.addCategory(category, this.recents);
      } else if (category === EmojiCategory.CUSTOM) {
        this.addCategory(category, this.custom);
      } else {
        this.addCategory(category, this.options.emojiData[category]);
      }
    });

    this.emojis.addEventListener('scroll', this.highlightCategory);

    this.emojis.addEventListener('keydown', this.handleKeyDown);

    this.events.on(CATEGORY_CLICKED, this.selectCategory, this);

    this.container.appendChild(this.emojis);

    const firstEmoji = findAllByClass(this.container, classes.emoji)[0];
    firstEmoji.tabIndex = 0;

    return this.container;
  }

  reset() {
    this.headerOffsets = Array.prototype.map.call(this.headers, header => header.offsetTop);

    const initialCategory = this.options.initialCategory || this.categories[0];

    this.selectCategory(initialCategory, false);
    this.currentCategory = this.categories.indexOf(initialCategory);
    this.events.emit(SET_ACTIVE_CATEGORY, this.currentCategory, false);
  }

  get currentCategoryEl() {
    return findAllByClass(this.emojis, classes.emojiContainer)[this.currentCategory];
  }

  get focusedEmoji() {
    return findAllByClass(this.currentCategoryEl, classes.emoji)[this.focusedIndex];
  }

  get currentEmojiCount() {
    return findAllByClass(this.currentCategoryEl, classes.emoji).length;
  }

  getEmojiCount(category) {
    const container = findAllByClass(this.emojis, classes.emojiContainer)[category];
    return findAllByClass(container, classes.emoji).length;
  }

  handleKeyDown = event => {
    this.emojis.removeEventListener('scroll', this.highlightCategory);
    switch (event.key) {
      case 'ArrowRight':
        this.focusedEmoji.tabIndex = -1;

        if (this.focusedIndex === this.currentEmojiCount - 1 && this.currentCategory < this.categories.length - 1) {
          this.events.emit(SET_ACTIVE_CATEGORY, ++this.currentCategory);
          this.setFocusedEmoji(0);
        } else if (this.focusedIndex < this.currentEmojiCount - 1) {
          this.setFocusedEmoji(this.focusedIndex + 1);
        }
        break;
      case 'ArrowLeft':
        this.focusedEmoji.tabIndex = -1;

        if (this.focusedIndex === 0 && this.currentCategory > 0) {
          this.events.emit(SET_ACTIVE_CATEGORY, --this.currentCategory);
          this.setFocusedEmoji(this.currentEmojiCount - 1);
        } else {
          this.setFocusedEmoji(Math.max(0, this.focusedIndex - 1));
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusedEmoji.tabIndex = -1;

        if (
          this.focusedIndex + this.emojisPerRow >= this.currentEmojiCount &&
          this.currentCategory < this.categories.length - 1
        ) {
          this.currentCategory++;
          this.events.emit(SET_ACTIVE_CATEGORY, this.currentCategory);
          this.setFocusedEmoji(Math.min(this.focusedIndex % this.emojisPerRow, this.currentEmojiCount - 1));
        } else if (this.currentEmojiCount - this.focusedIndex > this.emojisPerRow) {
          this.setFocusedEmoji(this.focusedIndex + this.emojisPerRow);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusedEmoji.tabIndex = -1;

        if (this.focusedIndex < this.emojisPerRow && this.currentCategory > 0) {
          const previousCategoryCount = this.getEmojiCount(this.currentCategory - 1);
          let previousLastRowCount = previousCategoryCount % this.emojisPerRow;
          if (previousLastRowCount === 0) {
            previousLastRowCount = this.emojisPerRow;
          }
          const currentColumn = this.focusedIndex;
          const newIndex =
            currentColumn > previousLastRowCount - 1
              ? previousCategoryCount - 1
              : previousCategoryCount - previousLastRowCount + currentColumn;

          this.currentCategory--;
          this.events.emit(SET_ACTIVE_CATEGORY, this.currentCategory);

          this.setFocusedEmoji(newIndex);
        } else {
          this.setFocusedEmoji(
            this.focusedIndex >= this.emojisPerRow ? this.focusedIndex - this.emojisPerRow : this.focusedIndex
          );
        }
        break;
    }
    requestAnimationFrame(() => this.emojis.addEventListener('scroll', this.highlightCategory));
  };

  setFocusedEmoji(index, focus = true) {
    this.focusedIndex = index;

    if (this.focusedEmoji) {
      this.focusedEmoji.tabIndex = 0;

      if (focus) {
        this.focusedEmoji.focus();
      }
    }
  }

  addCategory = (category, emojis) => {
    const nameEl = createElement('div', classes.categoryName);

    const categoryName = this.i18n.categories[category];

    const icon = createElement('div');
    icon.innerHTML = categoryIcons[category];

    const label = createElement('div', classes.categoryNameLabel);
    label.innerHTML = categoryName;

    nameEl.appendChild(icon);
    nameEl.appendChild(label);

    this.emojis.appendChild(nameEl);
    this.headers.push(nameEl);

    this.emojis.appendChild(
      new EmojiContainer(
        emojis,
        this.renderer,
        true,
        this.events,
        this.options,
        category !== EmojiCategory.RECENTS
      ).render()
    );
  };

  selectCategory(category, focus = true) {
    this.emojis.removeEventListener('scroll', this.highlightCategory);
    if (this.focusedEmoji) {
      this.focusedEmoji.tabIndex = -1;
    }

    const categoryIndex = this.categories.indexOf(category);
    this.currentCategory = categoryIndex;
    this.setFocusedEmoji(0, false);
    this.events.emit(SET_ACTIVE_CATEGORY, this.currentCategory, focus);

    const targetPosition = this.headerOffsets[categoryIndex];
    this.emojis.scrollTop = targetPosition;
    requestAnimationFrame(() => this.emojis.addEventListener('scroll', this.highlightCategory));
  }

  highlightCategory() {
    let closestHeaderIndex = this.headerOffsets.findIndex(offset => offset >= Math.round(this.emojis.scrollTop));

    if (this.emojis.scrollTop + this.emojis.offsetHeight === this.emojis.scrollHeight) {
      closestHeaderIndex = -1;
    }

    if (closestHeaderIndex === 0) {
      closestHeaderIndex = 1;
    } else if (closestHeaderIndex < 0) {
      closestHeaderIndex = this.headerOffsets.length;
    }

    if (this.headerOffsets[closestHeaderIndex] === this.emojis.scrollTop) {
      closestHeaderIndex++;
    }

    this.currentCategory = closestHeaderIndex - 1;
    this.events.emit(SET_ACTIVE_CATEGORY, this.currentCategory, false);
  }
}
