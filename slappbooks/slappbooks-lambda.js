let AWS = require('aws-sdk');
exports.handler = function(event, context, callback) {
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

	callback(null, JSON.stringify(event));
}