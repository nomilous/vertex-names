const {basename} = require('path');
const filename = basename(__filename);
const {format} = require('util');

const {generate} = require('../');

describe(filename, function () {

  this.timeout(10 * 1000);

  let count = 100000;
  let syllables = 4;

  it(format('generates %d %d syllable words without collision', count, syllables), done => {

    let words = {};

    // console.log();

    for (let i = 0; i < count; i++) {
      let word = generate(syllables);
      // console.log(word);
      if (words[word]) {
        throw new Error(format('Collided at %d generated word(s) of %d syllable', i, syllables))
      }
      words[word] = 1;
    }

    done();

  });

});
