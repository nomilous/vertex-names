**using node ^6.0.0**

[![npm](https://img.shields.io/npm/v/vertex-names.svg)](https://www.npmjs.com/package/vertex-names)
[![Build Status](https://travis-ci.org/nomilous/vertex-names.svg?branch=master)](https://travis-ci.org/nomilous/vertex-names)
[![Coverage Status](https://coveralls.io/repos/nomilous/vertex-names/badge.svg?branch=master&service=github)](https://coveralls.io/github/nomilous/vertex-names?branch=master)

# vertex-names

Random (realistic-language-ish) word generator.

```javascript
const {createWord} = require('vertex-names');

createWord(2); // 'hi'
               //         (that was literally the first word)
               //               i have seen it often:
               //          something "lives"  in the random
               //            and it has a sense of humour
               //                its second word was
               //                      'do'
               //



> for (i = 0; i < 10; i++){ console.log( createWord(11) ); }
redontriost
ansoizustru
soliguwluss
oiseprusene
nondocichid
hydrorasaty
erpitoryelo
nettaluspra
oovelamopef
inizygemord



// optionally release cache/memory when done (see data.json, not that small)
createWord.finished();

// create word and release
createWord(11, {finish: true});
```

