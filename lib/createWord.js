// Object.defineProperty(Array.prototype, 'last', {
//   get: function () {
//     return this[this.length - 1];
//   }
// });

const {readFileSync} = require('fs');
const cache = {};

module.exports = (length = 5, config = {}) => {

  if (Array.isArray(length)) {
    return length.reduce((word, i) => {
      if (typeof word == 'number') word = module.exports(word, config);
      word += module.exports(i, config);;
      return word;
    });

  }

  if (!cache.data) generateCache();

  let next;

  if (length == 1) {
    next = nextWithVowelFirst;
  } else {
    if (select(cache.data) == 'vowel') {
      next = nextWithVowelFirst;
    } else {
      next = nextWithConsonantFirst;
    }
  }

  let word = {
    data: '',
    parts: []
  };

  while (word.data.length < length) {

    let part;
    let type = next(word);

    while (!part) {

      let partLength;
      let retries = 100;

      while (!partLength) {
        partLength = select(cache.data[type]);
        if (parseInt(partLength) > length - word.data.length) partLength = undefined;
      }

      while (!part && retries > 0) {
        let partDetail;
        retries--;

        part = select(cache.data[type][partLength]);
        partDetail = cache.data[type][partLength][part];

        if (partDetail.front == 0 && word.data.length == 0) {
          // not allowed in front of word
          part = undefined;
          continue;
        }

        if (partDetail.back == 0 && length - word.data.length == part.length) {
          // not allowed in back of word
          part = undefined;
          continue;
        }

        if (word.data.length && word.data[word.data.length - 1] == 'q') {
          if (part[0] != 'u' || part.length < 2) {
            // only (u + another vowel) follows q
            part = undefined;
            continue;
          }
        }

        if (part[part.length - 1] == 'q' && word.data.length + part.length + 2 >= length) {
          // q cannot be second or third last letter
          part = undefined;
          continue;
        }


      }
    }

    word.data += part;
    word.parts.push(part);
  }

  if (config.finish) module.exports.finished();

  return word.data;
};

module.exports.finished = () => {
  delete cache._data;
  delete cache.data;
};

const select = (cursor) => {
  let random = Math.random() * cursor._range;
  for (let i = 0; i < cursor._pick.length; i++) {
    if (random < cursor._pick[i]) return cursor._selection[i];
  }
  return cursor._selection[cursor._selection.length - 1]; // just in case
};

const nextWithVowelFirst = (word) => {
  if (word.parts.length % 2) return 'consonant';
  return 'vowel';
};

const nextWithConsonantFirst = (word) => {
  if (word.parts.length % 2) return 'vowel';
  return 'consonant';
};

const generateDistribution = (cursor, data, path = '') => {
  cursor._range = data.total; // random 0 to _range
  cursor._selection = [];     // ...to sequence pick
  cursor._pick = [];          // ...from generated random

  let sum = 0;
  Object.keys(data.dist).forEach(key => {
    sum += data.dist[key].total;
    cursor._selection.push(key);
    cursor._pick.push(sum);
  });

  // lazy load selections (by property)
  cursor._selection.forEach(key => {
    let nested = path + '/' + key;
    Object.defineProperty(cursor, key, {
      enumerable: true,
      get: () => {
        if (cache._data[nested]) {
          return cache._data[nested];
        }

        if (!data.dist[key].dist) {
          cache._data[nested] = data.dist[key];
          return cache._data[nested];
        }

        cache._data[nested] = generateDistribution({}, data.dist[key], nested);
        return cache._data[nested];
      }
    })
  });

  return cursor;
};


const generateCache = () => {
  const data = require('../data.json');
  cache.data = {};
  cache._data = {};

  generateDistribution(cache.data, data);
};
