const {basename} = require('path');
const filename = basename(__filename);
const {format} = require('util');

const {createWord} = require('../');

describe(filename, function () {

  this.timeout(10 * 1000);

  let count = 100000;
  let length = 13;

  it(format('generates %d %d length words without collision', count, length), done => {

    let words = {};

    for (let i = 0; i < count; i++) {
      let word = createWord(length);
      if (words[word]) {
        throw new Error(format('Collided at %d generated word(s) of %d length', i, length))
      }
      words[word] = 1;
    }

    done();

  });

  it('one word', done => {

    console.log(createWord([1,3,3,4]));
    done();

  });

});
