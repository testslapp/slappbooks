let AWS = require('aws-sdk');
exports.handler = function(event, context, callback) {
	console.log(event);
	callback(null, JSON.stringify(event));
}