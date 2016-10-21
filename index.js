
const vowels = [
  'a',
  'e',
  'i', // <----------------------- no doubles
  'o',
  'u', // <----------------------- no doubles
  'y'  // <----------------------- no doubles
];

const singularVowels = {
  i: 1,
  u: 1,
  y: 1
};

const specialVowels = {
  y: {
    front: false
  }
};

const consonants = [
  'b', 'c', 'd',
  'f', 'g', 'h',
  'j', 'k', 'l', 'm', 'n',
  'p', 'r', 's', 't',
  'v', 'w', 'x', 'z',

  'ph', 'th', 'ch', 'sh', 'qu', 'ck', 'ng', 'gh', 'wh', 'ly'
];

const specialConsonants = {
  ph: {
    front: true,
    back: true
  },
  th: {
    front: true,
    back: true
  },
  ch: {
    front: true,
    back: true
  },
  sh: {
    front: true,
    back: true
  },
  qu: {
    front: true,
    back: false
  },
  ck: {
    front: false,
    back: true,
  },
  ng: {
    front: false,
    back: true
  },
  gh: {
    front: true,
    back: true
  },
  wh: {
    front: true,
    back: false
  },
  ly: {
    front: true,
    back: true
  }
};

const syllableTypes = ['vc', 'cvc', 'cv', 'vvc'];

const random = (n) => {
  return Math.round(Math.random() * n);
};

const randomVowel = (word, seq, last) => {
  let vowel;
  while (!vowel) {
    vowel = vowels[random(vowels.length - 1)];

    if (word.length > 0) {
      if (vowel == word[word.length - 1]) {
        if (singularVowels[word[word.length - 1]]) {
          vowel = undefined;
          continue;
        }
      }
    }

    if (!specialVowels[vowel]) break;

    if (word.length == 0 && !specialVowels[vowel].front) {
      vowel = undefined;
      continue;
    }
  }
  return vowel;
};

const randomConsonant = (word, seq, last) => {
  let consonant;
  while (!consonant) {
    consonant = consonants[random(consonants.length - 1)];
    if (!specialConsonants[consonant]) break;

    if (word.length == 0 && !specialConsonants[consonant].front) {
      consonant = undefined;
      continue;
    }

    if (last && seq == 0 && !specialConsonants[consonant].back) {
      consonant = undefined;
      continue;
    }
  }
  return consonant;

};

const randomSyllableType = () => {
  return syllableTypes[random(syllableTypes.length - 1)];
};

module.exports.generate = (syllables = 1) => {
  let word = '';
  let lastSyllable;

  for (let i = 0; i < syllables; i++) {
    lastSyllable = i == syllables - 1;
    switch(randomSyllableType()) {
      case 'vc':
        word += randomVowel(word, 1, lastSyllable);
        word += randomConsonant(word, 0, lastSyllable);
        break;
      case 'cvc':
        word += randomConsonant(word, 2, lastSyllable);
        word += randomVowel(word, 1, lastSyllable);
        word += randomConsonant(word, 0, lastSyllable);
        break;
      case 'cv':
        word += randomVowel(word, 1, lastSyllable);
        word += randomConsonant(word, 0, lastSyllable);
        break;
      case 'vvc':
        word += randomVowel(word, 2, lastSyllable);
        word += randomVowel(word, 1, lastSyllable);
        word += randomConsonant(word, 0, lastSyllable);
        break;

    }
  }

  return word;
};
