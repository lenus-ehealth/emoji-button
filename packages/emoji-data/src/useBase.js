const fs = require('fs');
const path = require('path');

const ora = require('ora');

// const emojis = require('emojibase-data/en/data.json');
// const groups = require('emojibase-data/en/meta.json');

// const locales = ['en'];

const locales = [
  'zh',
  'zh-hant',
  'da',
  'nl',
  'en',
  'en-gb',
  'et',
  'fi',
  'fr',
  'de',
  'hu',
  'it',
  'ja',
  'ko',
  'lt',
  'ms',
  'nb',
  'pl',
  'ru',
  'es',
  'es-mx',
  'sv',
  'th',
  'uk'
];

const outputBase = path.resolve(__dirname, '..', 'dist');

// Generate category data
console.log('Generating category data');
const spinner = ora().start();

const categoryOutput = path.resolve(outputBase, 'categories');
if (!fs.existsSync(categoryOutput)) {
  fs.mkdirSync(categoryOutput);
}

locales.forEach(locale => {
  spinner.start(locale);

  const { groups } = require(`emojibase-data/${locale}/meta.json`);
  const outputFilename = path.resolve(categoryOutput, `${locale}.js`);

  const outputData = groups.map(group => ({
    key: group.key,
    name: group.message
  }));

  fs.writeFileSync(
    outputFilename,
    `export default ${JSON.stringify(outputData)}`
  );

  spinner.succeed();
});

console.log('Generating emoji data');
const emojiOutput = path.resolve(outputBase, 'emojis');
if (!fs.existsSync(emojiOutput)) {
  fs.mkdirSync(emojiOutput);
}

locales.forEach(locale => {
  spinner.start(locale);

  const emojis = require(`emojibase-data/${locale}/data.json`);

  const emojiData = [];

  emojis.forEach(emojiRecord => {
    if (emojiRecord.group >= 0) {
      const item = {
        emoji: emojiRecord.emoji,
        name: emojiRecord.annotation,
        version: emojiRecord.version,
        category: emojiRecord.group
      };

      if (emojiRecord.skins) {
        item.variations = emojiRecord.skins.map(skin => skin.emoji);
      }

      emojiData.push(item);
    }
  });

  const outputFilename = path.resolve(emojiOutput, `${locale}.js`);

  fs.writeFileSync(
    outputFilename,
    `export default ${JSON.stringify(emojiData)}`
  );

  spinner.succeed();
});
