let AWS = require('aws-sdk');
let connectionManager = require('./ConnectionManager');
let SL = require('@slappforge/slappforge-sdk');
const rds = new SL.AWS.RDS(connectionManager);
exports.handler = function (event, context, callback) {
	console.log(event);
	let postObject = event.slice();
	let entityName = postObject.entity;
	let pageNo = postObject.page;
	let pageSize = postObject.pageSize;
	let sorted = postObject.sorted;
	let filtered = postObject.filtered;
	let startIndex = +pageNo * +pageSize;
	let endIndex = startIndex + pageSize;

	// Replace the query with the actual query
	// You can pass the existing connection to this function.
	// A new connection will be creted if it's not present as the third param 
	let sql = 'SELECT * FROM transaction WHERE entity_id = ? LIMIT ?,?'
	rds.query({
		identifier: 'slappbooksdb',
		query: '<query>'
	}, function (error, results, connection) {
		if (error) {
			console.log("Error occurred");
			throw error;
		} else {
			console.log("Success")
			console.log(results);
		}

		connection.end();
	});


	let transactions = {
		rows: [{ date: '01/16/2018', checkNo: '', notes: '', amount: 100, isCredit: false, entityName: 'Cash', trId: '12345678' },
		{ date: '01/16/2018', checkNo: '', notes: '', amount: '(100)', isCredit: true, entityName: 'Bank', trId: '87654321' }],
		pages: 1
	};
	callback(null, transactions);
}