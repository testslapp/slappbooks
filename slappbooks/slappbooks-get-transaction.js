let AWS = require('aws-sdk');
exports.handler = function(event, context, callback) {
	let transactionId = event.queryStringParameters.id;
	console.log(transactionId);
    let trs = [ { date: '01/16/2018', checkNo: '', notes: '', amount: 100, isCredit: false, entityName: 'Cash' , trId: '12345678' },
						 { date: '01/16/2018', checkNo: '', notes: '', amount: '(100)', isCredit: true, entityName: 'Bank', trId: '87654321' } ];
	console.log("Data retrieved", trs);
    callback(null, (trs) =>  {

		let response = {
        "statusCode": 200,
        "headers": {
            "my_header": "my_value"
        },
        "body": JSON.stringify(trs),
        "isBase64Encoded": false
        };
        return response;
		});
}