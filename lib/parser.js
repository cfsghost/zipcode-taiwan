var Transform = require('stream').Transform;
var util = require('util');

var Parser = module.exports = function(options) {
	if (!(this instanceof Parser))
		return new Parser(options);

	var options = this.options = options || {
		highWaterMark: 16,
		outputString: false
	};

	Transform.call(this, {
		highWaterMark: options.highWaterMark || 16,
		objectMode: true
	});
}

util.inherits(Parser, Transform);

Parser.prototype._transform = function(data, encoding, callback) {

	var result = {
		zipcode: data.children['zipcode'].value,
		name: data.children['name'].value,
		loc: {
			type: 'Point',
			coordinates: [
				data.children['lng'].value,
				data.children['lat'].value
			]
		}
	};

	if (this.options.outputString) {
		this.push(JSON.stringify(result));
	} else {
		this.push(result);
	}

	callback();
};
