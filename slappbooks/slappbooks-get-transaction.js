let AWS = require('aws-sdk');
exports.handler = function(event, context, callback) {
	let transactionId = event.queryStringParameters.id;
	console.log(transactionId);
	callback(null,'Successfully executed');
}