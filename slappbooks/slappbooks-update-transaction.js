let AWS = require('aws-sdk');
let connectionManager = require('./ConnectionManager');
let SL = require('@slappforge/slappforge-sdk');
const rds = new SL.AWS.RDS(connectionManager);
exports.handler = function (event, context, callback) {
	let transactions = event.slice();
	transactions.forEach(transaction => {
		if ((transaction.amount).toString().startsWith("(") && transaction.amount.toString().endsWith(")")) {
			transaction.amount = transaction.amount.slice(1, transaction.amount.length - 1);
		}
		transaction.isCredit = transaction.isCredit ? 1 : 0;
	});


	rds.beginTransaction({
		instanceIdentifier: 'slappbooksdb'
	}, function (error, connection) {
		if (error) { connection.rollback(); throw err; }


		// Replace the query with the actual query
		// You can pass the existing connection to this function.
		// A new connection will be creted if it's not present as the third param 

		let sql = 'UPDATE transaction SET transaction_id=?, set_id=?, date=?, entity_id=?, is_credit=?, cheque_no=?, voucher_no=?, amount=?, notes=?, reconcile=? WHERE transaction_id=?';
		transaction.forEach(transaction => {
				rds.query({
					instanceIdentifier: 'slappbooksdb',
					query: sql,
					inserts: [transaction.trId, transaction.setId, transaction.date, entity_id, transaction.isCredit, transaction.checkNo, transaction.voucherNo, transaction.amount, transaction.notes, transaction.reconcile, transaction.trId ]
				}, function (error, results, connection) {
					if (error) {
						connection.rollback();
						console.log("Error occurred while updating the transaction");
						throw error;
					} else {
						console.log("Successfully updated the transaction");
						connection.commit();
						connection.end();
						console.log(results);
					}
				}, connection);
		});
	});

	callback(null, 'Successfully executed');
}