const {basename} = require('path');
const filename = basename(__filename);
const {format} = require('util');

const {createWord} = require('../');

describe(filename, function () {

  this.timeout(60 * 1000);

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

  xit('one word', done => {

    console.log('\nsingle', createWord(7));
    console.log('milti', createWord([4,3,2,1]));
    done();

  });

  xit('q', done => {

    for (let i = 0; i < 10000; i++) {
      let word = createWord(7);
      if (word.indexOf('q') >= 0) {
        console.log(word);
      }
    }
    done();

  });

  it('sentance', done => {

    console.log();

    for (let i = 0; i < 25; i++) {
      let length = Math.round(Math.random() * 7) + 1;
      let word = createWord(length);
      if (i == 0) {
        let letter = word[0].toUpperCase();
        process.stdout.write(letter);
        process.stdout.write(word.substring(1));
        // word[0] = word[0].toUpperCase();
      } else {
        process.stdout.write(word);
      }
      if (i == 24) process.stdout.write('.');
      else process.stdout.write(' ');
    }

    console.log();
    done();

  });


});
