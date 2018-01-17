let AWS = require('aws-sdk');
let connectionManager = require('./ConnectionManager');
let SL = require('@slappforge/slappforge-sdk');
const rds = new SL.AWS.RDS(connectionManager);
exports.handler = function (event, context, callback) {
	console.log(event);
	let postObject = event;
	let entityName = postObject.entity;
	let pageNo = postObject.page;
	let pageSize = postObject.pageSize;
	let sorted = postObject.sorted;
	let filtered = postObject.filtered;
	let startIndex = +pageNo * +pageSize;
	let endIndex = startIndex + pageSize;
	let pageNumber = 1;

	// Replace the query with the actual query
	// You can pass the existing connection to this function.
	// A new connection will be creted if it's not present as the third param 
	let sql = 'SELECT * FROM transaction WHERE entity_id = ? LIMIT ?,?';

	rds.query({
				instanceIdentifier: 'slappbooksdb',
				query: 'SELECT id FROM entity WHERE name = ?',
				inserts: [entityName]
			}, function (error, results, connection) {
				if (error) {
					console.log("Error occurred while retreiving the entity id from the database", error);
					throw error;
				} else {
					console.log("Successfully retrieved the entity id")
					let entity_id = results[0].id;
					console.log(entity_id, startIndex, endIndex);
					// Replace the query with the actual query
					// You can pass the existing connection to this function.
					// A new connection will be creted if it's not present as the third param 
					rds.query({
						instanceIdentifier: 'slappbooksdb',
						query: sql,
						inserts: [entity_id, startIndex, endIndex]
					}, function (error, results, connection) {
						if (error) {
							console.log("Error occurred while retreiving transactions", error);
							throw error;
						} else {
							let transactions = [];
							console.log("Successfully retreived transactions");
							results.forEach(result => {
								transactions.push({
									trId: result.transaction_id,
									checkNo: result.cheque_no,
									voucherNo: result.voucher_no,
									isCredit: result.is_credit,
									amount: result.amount,
									notes: result.notes,
									reconcile: results.reconcile,
									entityName: entityName
								});
							});
							let finalResult = { rows: transactions, pages: pageNumber}
							console.log(finalResult);
							callback(null, finalResult);
						}

						connection.end();
					}, connection);

				}

			});


	/* let transactions = {
		rows: [{ date: '01/16/2018', checkNo: '', notes: '', amount: 100, isCredit: false, entityName: 'Cash', trId: '12345678' },
		{ date: '01/16/2018', checkNo: '', notes: '', amount: '(100)', isCredit: true, entityName: 'Bank', trId: '87654321' }],
		pages: 1
	};
	callback(null, transactions); */
}