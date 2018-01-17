let AWS = require('aws-sdk');
exports.handler = function(event, context, callback) {
	console.log(event);
	let transactions = [ { date: '01/16/2018', checkNo: '', notes: '', amount: 100, isCredit: false, entityName: 'Cash' },
						 { date: '01/16/2018', checkNo: '', notes: '', amount: '(100)', isCredit: true, entityName: 'Bank' } ];
	callback(null, transactions);
}