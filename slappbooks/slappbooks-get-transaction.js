let AWS = require('aws-sdk');
exports.handler = function(event, context, callback) {
	let transactionId = event.queryStringParameters.id;
	console.log(transactionId);
	callback(null, function (err, data) {
		if (err) {
			  callback(err, null);
		} else {
			 let response = {
        "statusCode": 200,
        "headers": {
            "my_header": "my_value"
        },
        "body": JSON.stringify(data),
        "isBase64Encoded": false
    };
           callback(null, response);
		}});
}