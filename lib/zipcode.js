var fs = require('fs');
var path = require('path');
var saxStream = require('sax-stream');
var pipe = require('multipipe');
var Parser = require('./parser');
var Transform = require('stream').Transform;
var readline = require('readline');

module.exports = {
	fetch: function() {
		return fs.createReadStream(path.join(__dirname, '..', 'data', 'zipcode.xml'));
	},
	parse: function(opts) {

		var input = new Transform({
			transform: function(chunk, encoding, callback) {
				this.push(chunk);
				callback();
			}
		});

		var output = new Transform({
			transform: function(chunk, encoding, callback) {
				callback();
			}
		});

		var lineReader = readline.createInterface({
			input: input,
			historySize: 0,
			crlfDelay: 0
		});
		lineReader.on('line', function(line) {
			line = line.replace(/_x0031_050429_行政區經緯度_x0028_toPost_x0029_/g, 'area');
			line = line.replace(/行政區名/g, 'name');
			line = line.replace(/_x0033_碼郵遞區號/g, 'zipcode');
			line = line.replace(/中心點經度/g, 'lng');
			line = line.replace(/中心點緯度/g, 'lat');
			output.push(line);
		});

		lineReader.on('close', function() {
			output.push(null);
		});

		var normalize = pipe(input, output);

		var sax = saxStream({
			strict: true,
			position: true,
			tag: 'area'
		});

		var parser = Parser(opts);

		return pipe(normalize, sax, parser);
	}
};
