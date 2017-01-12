# zipcode-taiwan
Used to get Taiwan's zip code table

[![NPM](https://nodei.co/npm/zipcode-taiwan.png)](https://nodei.co/npm/zipcode-taiwan/)

## Installation

Install via NPM:
```
npm install zipcode-taiwan
```

## Usage


```js
var zipcodeTW = require('zipcode-taiwan');

// Fetching raw data
var fetcher = zipcodeTW.fetch();

// Creating a parser to convert raw data to JavaScript object
var parser = zipcodeTW.parse();

parser.on('data', function(data) {
    console.log(data);
});

fetcher.pipe(parser);
```

### Support Stream and Pipe

Here is an example to use stream/pipe to convert data and output string to a file.

```js
var fs = require('fs');
var zipcodeTW = require('zipcode-taiwan');

weatherTW
    .fetch()
    .pipe(zipcodeTW.parse({ outputString: true }))
    .pipe(fs.createWriteStream('zipcode.json'));
```

License
-
Licensed under the MIT License

Authors
-
Copyright(c) 2017 Fred Chien <<cfsghost@gmail.com>>
