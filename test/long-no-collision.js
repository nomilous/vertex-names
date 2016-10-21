const {basename} = require('path');
const filename = basename(__filename);
const {format} = require('util');

const {generate} = require('../');

describe(filename, function () {

  this.timeout(10 * 1000);

  let count = 100000;
  let length = 13;

  it(format('generates %d %d length words without collision', count, length), done => {

    let words = {};

    // console.log();

    for (let i = 0; i < count; i++) {
      let word = generate(length);
      // console.log(word);
      if (words[word]) {
        throw new Error(format('Collided at %d generated word(s) of %d length', i, length))
      }
      words[word] = 1;
    }

    done();

  });

});
