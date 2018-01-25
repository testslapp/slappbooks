let AWS = require('aws-sdk');
let connectionManager = require('./ConnectionManager');
let SL = require('@slappforge/slappforge-sdk');
const rds = new SL.AWS.RDS(connectionManager);

exports.handler = function (event, context, callback) {

    let entries = [];
	let sql = "SELECT E.name AS name, ABS(SUM( IF(T.is_credit='1', -1*T.amount, T.amount))) AS value FROM transaction T INNER JOIN entity E on T.entity_id=E.id GROUP BY E.id;";
	rds.query({
		instanceIdentifier: 'slappbooksdb',
		query: sql,
		inserts: []
	}, function (error, results, connection) {
		if (error) {
			console.log("Error occurred while preparing the trial balance", error);
			throw error;
		} else {
			console.log("Successfully prepared the trial balance")
			console.log(results);
			results.forEach(result => {
				let entry = {
					name: result.name,
					isCredit: result.value < 0 ? true: false,
					value: result.value
				}
				entries.push(entry);
			});
		}
		connection.end();
		callback(error, entries);
	});

}