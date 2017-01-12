var zipcodeTW = require('../');

var fetcher = zipcodeTW.fetch();

var parser = zipcodeTW.parse();

parser.on('data', function(data) {
	console.log(data);
});

fetcher.pipe(parser);

