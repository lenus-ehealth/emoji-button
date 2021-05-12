import emojiData from './data/emoji';
import { i18n as defaultI18n } from './i18n';

import {
  CLASS_EMOJI_CONTAINER,
  CLASS_EMOJI,
  CLASS_EMOJI_AREA,
  CLASS_EMOJIS,
  CLASS_CATEGORY_NAME
} from './classes';

import { CategoryButtons } from './categoryButtons';
import { EmojiContainer } from './emojiContainer';

import { CATEGORY_CLICKED } from './events';

import { createElement } from './util';
import { load } from './recent';

const categorySortOrder = [
  'recents',
  'smileys',
  'people',
  'animals',
  'food',
  'activities',
  'travel',
  'objects',
  'symbols',
  'flags',
  'custom'
];

export class EmojiArea {
  headerOffsets;
  currentCategory = 0;
  headers = [];
  categoryButtons;
  emojisPerRow;
  categories;

  focusedIndex = 0;

  container;
  emojis;

  constructor(events, i18n, options, emojiCategories) {
    this.events = events;
    this.i18n = i18n;
    this.options = options;
    this.emojiCategories = emojiCategories;

    this.emojisPerRow = options.emojisPerRow || 8;
    this.categories =
      options.emojiData?.categories ||
      options.categories ||
      emojiData.categories;

    if (options.showRecents) {
      this.categories = ['recents', ...this.categories];
    }

    if (options.custom) {
      this.categories = [...this.categories, 'custom'];
    }

    this.categories.sort(
      (a, b) => categorySortOrder.indexOf(a) - categorySortOrder.indexOf(b)
    );
  }

  updateRecents() {
    if (this.options.showRecents) {
      this.emojiCategories.recents = load();
      const recentsContainer = this.emojis.querySelector(
        `.${CLASS_EMOJI_CONTAINER}`
      );
      if (recentsContainer?.parentNode) {
        recentsContainer.parentNode.replaceChild(
          new EmojiContainer(
            this.emojiCategories.recents,
            true,
            this.events,
            this.options,
            false
          ).render(),
          recentsContainer
        );
      }
    }
  }

  render() {
    this.container = createElement('div', CLASS_EMOJI_AREA);

    if (this.options.showCategoryButtons) {
      this.categoryButtons = new CategoryButtons(
        this.options,
        this.events,
        this.i18n
      );
      this.container.appendChild(this.categoryButtons.render());
    }

    this.emojis = createElement('div', CLASS_EMOJIS);

    if (this.options.showRecents) {
      this.emojiCategories.recents = load();
    }

    if (this.options.custom) {
      this.emojiCategories.custom = this.options.custom.map(custom => ({
        ...custom,
        custom: true
      }));
    }

    this.categories.forEach(category =>
      this.addCategory(category, this.emojiCategories[category])
    );

    requestAnimationFrame(() => {
      setTimeout(() => {
        setTimeout(() =>
          this.emojis.addEventListener('scroll', this.highlightCategory)
        );
      });
    });

    this.emojis.addEventListener('keydown', this.handleKeyDown);

    this.events.on(CATEGORY_CLICKED, this.selectCategory);

    this.container.appendChild(this.emojis);

    const firstEmoji = this.container.querySelectorAll(`.${CLASS_EMOJI}`)[0];
    firstEmoji.tabIndex = 0;

    return this.container;
  }

  reset() {
    this.headerOffsets = Array.prototype.map.call(
      this.headers,
      header => header.offsetTop
    );

    this.selectCategory(this.options.initialCategory || 'smileys', false);
    this.currentCategory = this.categories.indexOf(
      this.options.initialCategory || 'smileys'
    );

    if (this.options.showCategoryButtons) {
      this.categoryButtons.setActiveButton(this.currentCategory, false);
    }
  }

  get currentCategoryEl() {
    return this.emojis.querySelectorAll(`.${CLASS_EMOJI_CONTAINER}`)[
      this.currentCategory
    ];
  }

  get focusedEmoji() {
    return this.currentCategoryEl.querySelectorAll(`.${CLASS_EMOJI}`)[
      this.focusedIndex
    ];
  }

  get currentEmojiCount() {
    return this.currentCategoryEl.querySelectorAll(`.${CLASS_EMOJI}`).length;
  }

  getEmojiCount(category) {
    const container = this.emojis.querySelectorAll(`.${CLASS_EMOJI_CONTAINER}`)[
      category
    ];
    return container.querySelectorAll(`.${CLASS_EMOJI}`).length;
  }

  handleKeyDown = event => {
    this.emojis.removeEventListener('scroll', this.highlightCategory);
    switch (event.key) {
      case 'ArrowRight':
        this.focusedEmoji.tabIndex = -1;

        if (
          this.focusedIndex === this.currentEmojiCount - 1 &&
          this.currentCategory < this.categories.length - 1
        ) {
          if (this.options.showCategoryButtons) {
            this.categoryButtons.setActiveButton(++this.currentCategory);
          }
          this.setFocusedEmoji(0);
        } else if (this.focusedIndex < this.currentEmojiCount - 1) {
          this.setFocusedEmoji(this.focusedIndex + 1);
        }
        break;
      case 'ArrowLeft':
        this.focusedEmoji.tabIndex = -1;

        if (this.focusedIndex === 0 && this.currentCategory > 0) {
          if (this.options.showCategoryButtons) {
            this.categoryButtons.setActiveButton(--this.currentCategory);
          }
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
          if (this.options.showCategoryButtons) {
            this.categoryButtons.setActiveButton(this.currentCategory);
          }
          this.setFocusedEmoji(
            Math.min(
              this.focusedIndex % this.emojisPerRow,
              this.currentEmojiCount - 1
            )
          );
        } else if (
          this.currentEmojiCount - this.focusedIndex >
          this.emojisPerRow
        ) {
          this.setFocusedEmoji(this.focusedIndex + this.emojisPerRow);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusedEmoji.tabIndex = -1;

        if (this.focusedIndex < this.emojisPerRow && this.currentCategory > 0) {
          const previousCategoryCount = this.getEmojiCount(
            this.currentCategory - 1
          );
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
          if (this.options.showCategoryButtons) {
            this.categoryButtons.setActiveButton(this.currentCategory);
          }

          this.setFocusedEmoji(newIndex);
        } else {
          this.setFocusedEmoji(
            this.focusedIndex >= this.emojisPerRow
              ? this.focusedIndex - this.emojisPerRow
              : this.focusedIndex
          );
        }
        break;
    }
    requestAnimationFrame(() =>
      this.emojis.addEventListener('scroll', this.highlightCategory)
    );
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
    const name = createElement('h2', CLASS_CATEGORY_NAME);
    name.innerHTML =
      this.i18n.categories[category] || defaultI18n.categories[category];
    this.emojis.appendChild(name);
    this.headers.push(name);

    this.emojis.appendChild(
      new EmojiContainer(
        emojis,
        true,
        this.events,
        this.options,
        category !== 'recents'
      ).render()
    );
  };

  selectCategory = (category, focus = true) => {
    this.emojis.removeEventListener('scroll', this.highlightCategory);
    if (this.focusedEmoji) {
      this.focusedEmoji.tabIndex = -1;
    }

    const categoryIndex = this.categories.indexOf(category);
    this.currentCategory = categoryIndex;
    this.setFocusedEmoji(0, false);
    if (this.options.showCategoryButtons) {
      this.categoryButtons.setActiveButton(this.currentCategory, focus);
    }

    const targetPosition = this.headerOffsets[categoryIndex];
    this.emojis.scrollTop = targetPosition;
    requestAnimationFrame(() =>
      this.emojis.addEventListener('scroll', this.highlightCategory)
    );
  };

  highlightCategory = () => {
    if (document.activeElement?.classList.contains('emoji-picker__emoji')) {
      return;
    }

    let closestHeaderIndex = this.headerOffsets.findIndex(
      offset => offset >= Math.round(this.emojis.scrollTop)
    );

    if (
      this.emojis.scrollTop + this.emojis.offsetHeight ===
      this.emojis.scrollHeight
    ) {
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
    if (this.options.showCategoryButtons) {
      this.categoryButtons.setActiveButton(this.currentCategory);
    }
  };
}
