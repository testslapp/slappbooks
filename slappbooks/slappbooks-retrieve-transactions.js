let AWS = require('aws-sdk');
exports.handler = function(event, context, callback) {
	console.log(event);
	let transactions = { rows : [ { date: '01/16/2018', checkNo: '', notes: '', amount: 100, isCredit: false, entityName: 'Cash' , trId: '12345678' },
						 { date: '01/16/2018', checkNo: '', notes: '', amount: '(100)', isCredit: true, entityName: 'Bank', trId: '87654321' } ],
						 pages : 1
						};
	callback(null, transactions);
}