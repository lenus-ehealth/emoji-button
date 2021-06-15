import { css, keyframes } from '@emotion/css';

const show = keyframes`
  0% {
    opacity: 0;
    transform: scale3d(0.8, 0.8, 0.8);
  }

  50% {
    transform: scale3d(1.05, 1.05, 1.05);
  }

  100% {
    transform: scale3d(1, 1, 1);
  }
`;

const hide = keyframes`
  0% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }

  100% {
    opacity: 0;
    transform: scale3d(0.8, 0.8, 0.8);
  }
`;

const grow = keyframes`
  0% {
    opacity: 0;
    transform: scale3d(0.8, 0.8, 0.8); 
  }

  100% { 
    opacity: 1;
    transform: scale3d(1, 1, 1); 
  }
`;

const shrink = keyframes`
  0% { 
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }

  100% { 
    opacity: 0;
    transform: scale3d(0.8, 0.8, 0.8); 
  }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

export const picker = css`
  --animation-duration: 0.2s;
  --animation-easing: ease-in-out;

  --blue-color: #4f81e5;

  --border-radius: 5px;
  --content-height: 22rem;

  --emoji-per-row: 8;
  --emoji-preview-size: 2em;
  --emoji-size: 1.8em;
  --emoji-size-multiplier: 1.5;

  --category-button-height: 2em;
  --category-button-size: 1.1em;
  --category-border-bottom-size: 4px;

  --search-height: 2em;

  --overlay-background-color: rgba(0, 0, 0, 0.8);

  --emoji-font: 'Segoe UI Emoji', 'Segoe UI Symbol', 'Segoe UI', 'Apple Color Emoji', 'Twemoji Mozilla',
    'Noto Color Emoji', 'EmojiOne Color', 'Android Emoji';
  --ui-font: Arial, Helvetica, sans-serif;

  animation: ${show} var(--animation-duration) var(--animation-easing);
  background: var(--background-color);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  font-family: var(--ui-font);
  font-size: 16px;
  overflow: hidden;
  position: relative;
  width: calc(var(--emoji-per-row) * var(--emoji-size) * var(--emoji-size-multiplier) + 1em + 1.5rem);

  &.hiding {
    animation: ${hide} var(--animation-duration) var(--animation-easing);
  }

  & > * {
    font-family: var(--ui-font);
    box-sizing: content-box;
  }
`;

export const overlay = css`
  background: rgba(0, 0, 0, 0.75);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

export const content = css`
  height: var(--content-height);
  padding: 0.5em;
  position: relative;
`;

export const preview = css`
  align-items: center;
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: row;
  height: var(--emoji-preview-size);
  padding: 0.5em;
`;

export const previewEmoji = css`
  font-size: var(--emoji-preview-size);
  margin-right: 0.25em;
  font-family: var(--emoji-font);

  img.emoji {
    height: 1em;
    width: 1em;
    margin: 0 0.05em 0 0.1em;
    vertical-align: -0.1em;
  }
`;

export const previewName = css`
  color: var(--text-color);
  font-size: 0.85em;
  overflow-wrap: break-word;
  word-break: break-all;
`;

export const emojiContainer = css`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(var(--emoji-per-row), calc(var(--emoji-size) * var(--emoji-size-multiplier)));
  grid-auto-rows: calc(var(--emoji-size) * var(--emoji-size-multiplier));
`;

export const searchResults = css`
  height: var(--content-height);
  overflow-y: auto;
`;

export const customEmoji = css`
  width: 1em;
  height: 1em;
`;

export const emoji = css`
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: inline-flex;
  font-family: var(--emoji-font);
  font-size: var(--emoji-size);
  height: 1.5em;
  justify-content: center;
  margin: 0;
  outline: none;
  overflow: hidden;
  padding: 0;
  width: 1.5em;

  img.emoji {
    height: 1em;
    width: 1em;
    margin: 0 0.05em 0 0.1em;
    vertical-align: -0.1em;
  }

  &:focus {
    outline: 1px dotted var(--focus-indicator-color);
  }

  &:focus,
  &:hover {
    background: var(--hover-color);
  }
`;

export const pluginContainer = css`
  margin: 0.5em;
  display: flex;
  flex-direction: row;
`;

export const searchContainer = css`
  display: flex;
  height: var(--search-height);
  margin: 0.5em;
  position: relative;
`;

export const search = css`
  background: var(--search-background-color);
  border-radius: 3px;
  border: 1px solid var(--border-color);
  box-sizing: border-box;
  color: var(--text-color);
  font-size: 0.85em;
  outline: none;
  padding-right: 2em;
  padding: 0.5em 2.25em 0.5em 0.5em;
  width: 100%;

  &:focus {
    border: 1px solid var(--search-focus-border-color);
  }

  &::placeholder {
    color: var(--search-placeholder-color);
  }
`;

export const searchIcon = css`
  color: var(--search-icon-color);
  height: 1em;
  position: absolute;
  right: 0.75em;
  top: calc(50% - 0.5em);
  width: 1em;

  img {
    width: 1em;
    height: 1em;
  }
`;

export const searchNotFound = css`
  color: var(--secondary-text-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  text-align: center;

  div {
    color: var(--secondary-text-color);
  }
`;

export const searchNotFoundMessage = css`
  color: var(--secondary-text-color);
  font-size: 1.25em;
  font-weight: bold;
  margin: 0.5em 0;
`;

export const searchNotFoundIcon = css`
  font-size: 3em;

  img {
    width: 1em;
    height: 1em;
  }
`;

export const variantOverlay = css`
  animation: ${fadeIn} var(--animation-duration) var(--animation-easing);
  background: var(--overlay-background-color);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  &.hiding {
    animation: ${fadeOut} var(--animation-duration) var(--animation-easing);

    div {
      animation: ${shrink} var(--animation-duration) var(--animation-easing);
    }
  }
`;

export const variantPopup = css`
  animation: ${grow} var(--animation-duration) var(--animation-easing);
  background: var(--popup-background-color);
  border-radius: 5px;
  margin: 0.5em;
  padding: 0.5em;
  text-align: center;
  user-select: none;
`;

export const emojis = css`
  height: calc(var(--content-height) - var(--category-button-height));
  overflow-y: auto;
  position: relative;

  &.hiding {
    animation: ${fadeOut} 0.05s var(--animation-easing);
  }
`;

export const categoryName = css`
  align-items: center;
  color: var(--secondary-text-color);
  display: flex;
  font-size: 1.2em;
  font-weight: bold;
  margin: 0.5em 0;
  text-align: left;
`;

export const categoryNameLabel = css`
  margin-left: 0.25em;
`;

export const categoryButtons = css`
  display: flex;
  flex-direction: row;
  height: var(--category-button-height);
  justify-content: space-around;
  margin-bottom: 0.5em;
`;

export const categoryButton = css`
  background: transparent;
  border: none;
  border-bottom: var(--category-border-bottom-size) solid transparent;
  color: var(--category-button-color);
  cursor: pointer;
  flex-grow: 1;
  font-size: var(--category-button-size);
  /* outline: none; */
  padding: 0;
  vertical-align: middle;

  img {
    width: var(--category-button-size);
    height: var(--category-button-size);
  }

  &:focus {
    outline: 1px dotted var(--focus-indicator-color);
  }

  &.active {
    color: var(--category-button-active-color);
    border-bottom: var(--category-border-bottom-size) solid var(--category-button-active-color);
  }
`;
