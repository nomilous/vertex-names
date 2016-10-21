**using node ^6.0.0**

[![npm](https://img.shields.io/npm/v/vertex-names.svg)](https://www.npmjs.com/package/vertex-names)
[![Build Status](https://travis-ci.org/nomilous/vertex-names.svg?branch=master)](https://travis-ci.org/nomilous/vertex-names)
[![Coverage Status](https://coveralls.io/repos/nomilous/vertex-names/badge.svg?branch=master&service=github)](https://coveralls.io/github/nomilous/vertex-names?branch=master)

# vertex-names

Random word (ish) generator.

```javascript
const {createWord} = require('vertex-names');

// word
createWord(7); // 'soghimo'

// word of words
createWord([2,4,4]); // 'atmaphsupi'
```

