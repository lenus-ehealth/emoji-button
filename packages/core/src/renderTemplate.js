import Mustache from 'mustache';

import * as classes from './styles';

export default function renderTemplate(template, context) {
  return document
    .createRange()
    .createContextualFragment(
      Mustache.render(template.trim(), {
        ...context,
        classes
      })
    ).firstElementChild;
}