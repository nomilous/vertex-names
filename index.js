Object.defineProperty(Array.prototype, 'last', {
  get: function () {
    return this[this.length - 1];
  }
});

Object.defineProperty(Array.prototype, 'secondlast', {
  get: function () {
    return this[this.length - 2];
  }
});

module.exports.createWord = (length = 5) => {
  let word = '';
  let previous = [];
  let type;

  if (typeof length == 'number') {
    for (let i = 0; i < length; i++) {
      type = length == 1 ? 'vowel' : functions.next(previous);
      previous.push(functions[type](previous, length - word.length));
      word += previous.last.part;
      if (word.length >= length) {
        return word;
      }
    }
  }

  console.log();
  if (Array.isArray(length)) {
    length.forEach(length => {
      word += module.exports.createWord(length);
    });
    return word;
  }

};


const data = module.exports.data = {

  vowels: [
    'a',
    'e',
    'i',
    'o',
    'u'
  ],

  consonants: [
    'b', 'c', 'd',
    'f', 'g', 'h',
    'j', 'k', 'l', 'm', 'n',
    'p', 'r', 's', 't',
    'v', 'w', /*'x',*/ 'y', 'z',

    'ph', 'th', 'ch', 'sh', 'qu', 'ck', 'ng', 'gh', 'wh', 'ly'
  ],

  specials: {
    consonants: {
      h: {
        front: true,
        back: false
      },
      j: {
        front: true,
        back: false
      },
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
    }
  },

  chances: {
    firstLetter: {
      consonant: 3,
      vowel: 1
    }
  }

};


const functions = module.exports.functions = {

  random: (n) => {
    return Math.round(Math.random() * n);
  },

  // oneIn: (n) => {
  //   return Math.round(Math.random() * (n)) == 1;
  // },

  choice: (chances) => {
    let array = [];
    Object.keys(chances).forEach(choice => {
      while (array.push(choice) < chances[choice]) {}
    });
    return array[functions.random(array.length - 1)];
  },

  vowel: (previous, remaining) => {
    let vowel;
    while (!vowel) {
      vowel = data.vowels[functions.random(data.vowels.length - 1)];

      if (previous.last && previous.last.part == 'qu' && vowel == 'u') {
        vowel = undefined;
        continue;
      }
    }

    return {
      part: vowel,
      type: 'vowel'
    };
  },

  consonant: (previous, remaining) => {
    let consonant;
    let double = false;
    while (!consonant) {
      consonant = data.consonants[functions.random(data.consonants.length - 1)];

      if (consonant.length > remaining) {
        consonant = undefined;
        continue;
      }

      if (data.specials.consonants[consonant]) {
        if (previous.length == 0 && !data.specials.consonants[consonant].front) {
          consonant = undefined;
          continue;
        }
        if (remaining == 2 && !data.specials.consonants[consonant].back) {
          consonant = undefined;
          continue;
        }
      }
    }

    return {
      part: consonant,
      type: 'consonant',
      double: double
    };
  },

  next: (previous) => {
    if (previous.length == 0) {
      return functions.choice(data.chances.firstLetter);
    }

    if (previous.last.type == 'vowel') return 'consonant';
    return 'vowel';
  }
};
