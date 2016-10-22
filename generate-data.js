const {readFileSync, writeFileSync} = require('fs');

const config = {
  vowels: [
    'a', 'e', 'i', 'o', 'u'
  ],
  consonants: [
    'b', 'c', 'd',
    'f', 'g', 'h',
    'j', 'k', 'l', 'm', 'n',
    'p', 'q', 'r', 's', 't',
    'v', 'w', 'x', 'y', 'z'
  ]
};

let words = readFileSync('/usr/share/dict/words').toString().split('\n');

words = words
  .map(word => {
    return word.toLowerCase();
  })
  .filter(word => {
    for (let i in word) {
      if (word.charCodeAt(i) < 97) return false;
      if (word.charCodeAt(i) > 122) return false;
    }
    return true;
  });


const chains = (words, type) => {

  let chainList = {};

  const handleChain = (chain, front, back) => {
    if (!chainList[chain]) chainList[chain] = {
      total: 0,
      front: 0,
      back: 0
    }

    chainList[chain].total++;
    if (front) chainList[chain].front++;
    if (back) chainList[chain].back++;
  };

  words.forEach(word => {
    let chain = '';

    for (let i in word) {
      if (config[type].indexOf(word[i]) < 0) {
        if (chain.length) {
          handleChain(chain, i == chain.length, false);
          chain = '';
        }
        continue;
      }
      chain += word[i];
    }

    if (chain.length) {
      handleChain(chain, chain.length == word.length, true);
    }
  });

  let total = 0;
  let byLength = {};
  Object.keys(chainList)
    .map(name => {
      total += chainList[name].total;
      return [chainList[name].total, name, chainList[name]];
    })
    .sort((a, b) => {
      if (a[0] < b[0]) return 1;
      if (b[0] < a[0]) return -1;
      return 0;
    })
    .forEach(record => {
      let length = record[1].length;
      byLength[length] = byLength[length] || {total: 0, dist: {}};
      byLength[length].dist[record[1]] = record[2];
      byLength[length].total += record[2].total;
    });


  return {
    total: total,
    dist: byLength
  };
};

const vowelsList = chains(words, 'vowels');
const consonantsList = chains(words, 'consonants');

const data = {
  total: vowelsList.total + consonantsList.total,
  dist: {
    vowel: vowelsList,
    consonant: consonantsList
  }
};


// final adjustments
try {
  data.dist.consonant.dist[2].dist.ll.front = 0; // no leading 'll'
} catch (e) {}
try {
  data.dist.consonant.dist[2].dist.ct.front = 0;
} catch (e) {}
try {
  data.dist.consonant.dist[2].dist.ss.front = 0;
} catch (e) {}
try {
  data.dist.consonant.dist[2].dist.ii.front = 0;
} catch (e) {}


// console.log(data.vowels);
// console.log(data.consonants);

writeFileSync(__dirname + '/data.json', JSON.stringify(data, null, 2));
