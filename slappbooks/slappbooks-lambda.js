let AWS = require('aws-sdk');
let connectionManager = require('./ConnectionManager');
let SL = require('@slappforge/slappforge-sdk');
const rds = new SL.AWS.RDS(connectionManager);
exports.handler = function (event, context, callback) {
	console.log(event);
	let transactions = [];
	let dates = [];
	let checkNo = [];
	let notes = [];
	let amounts = [];
	let creditArray = [];
	let entityNames = [];

	transactions = event.slice();
	transactions.forEach((transaction, index) => {
		dates.push(transaction.date);
		checkNo.push(transaction.checkNo);
		notes.push(transaction.notes);
		amounts.push(transaction.amount);
		creditArray.push(transaction.isCredit);
		entityNames.push(transaction.entityName);
	});

	console.log(transactions);
	console.log(dates);
	console.log(amounts);
	console.log(checkNo);
	console.log(notes);
	console.log(amounts);
	console.log(creditArray);
	console.log(entityNames);


	rds.beginTransaction({
		instanceIdentifier: 'slappbooksdb'
	}, function (error, connection) {
		if (error) { throw err; }

		// Replace the query with the actual query
		// You can pass the existing connection to this function.
		// A new connection will be creted if it's not present as the third param


		// Replace the query with the actual query
		// You can pass the existing connection to this function.
		// A new connection will be creted if it's not present as the third param 

		let sql = 'INSERT INTO transaction (date, entity_id, cheque_no, voucher_no, amount, notes, reconcile) VALUES (?,?, ?, ?, ?, ?, ?);'
		transactions.forEach(transaction => {

			rds.query({
			instanceIdentifier: 'slappbooksdb',
			query: 'SELECT id FROM entity WHERE name = ?',
			transactional: false,
			inserts: [transaction.entityName]
		}, function (error, results, connection) {
			if (error) {
				console.log("Error occurred");
				throw error;
			} else {
				console.log("Success")
				console.log(results);
			}

			connection.end();
		}, connection);
		});

	});


	callback(null, JSON.stringify(event));
}