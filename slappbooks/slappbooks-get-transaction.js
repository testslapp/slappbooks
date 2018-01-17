let AWS = require('aws-sdk');
let connectionManager = require('./ConnectionManager');
let SL = require('@slappforge/slappforge-sdk');
const rds = new SL.AWS.RDS(connectionManager);
exports.handler = function (event, context, callback) {
    let transactionId = event.queryStringParameters.id;


    
    sql = 'SELECT T.transaction_id, T.date, T.cheque_no, T.is_credit, T.amount, T.notes, T.reconcile, E.name' +
     'FROM transaction  AS T INNER JOIN entity AS E on T.entity_id=E.id where T.transaction_id=?;';    
    // Replace the query with the actual query
    // You can pass the existing connection to this function.
    // A new connection will be creted if it's not present as the third param 
    rds.query({
        instanceIdentifier: 'slappbooksdb',
        query: sql,
        inserts: [transactionId]
    }, function (error, results, connection) {
        if (error) {
            console.log("Error occurred while retrieving the transaction with id", transactionId, error);
            throw error;
        } else {
            console.log("Successfully retrieved the transaction")
            let transactions = [];
            console.log("Successfully retreived transactions");
            results.forEach(result => {
                transactions.push({
                    trId: result.transaction_id,
                    date: result.date,
                    checkNo: result.cheque_no,
                    voucherNo: result.voucher_no,
                    isCredit: result.is_credit,
                    amount: result.amount,
                    notes: result.notes,
                    reconcile: results.reconcile,
                    entityName: results.name
                });
            });
            let finalResult = { rows: transactions, pages: pageNumber}
            console.log(finalResult);
            connection.end();
             callback(null, {
                        "statusCode": 200,
                        "headers": {
                            "my_header": "my_value",
                            "Access-Control-Allow-Origin": "*"
                        },
                        "body": JSON.stringify(trs),
                        "isBase64Encoded": false
                    });
        }
    });


   /* let trs = [{ date: '01/16/2018', checkNo: '', notes: '', amount: 100, isCredit: false, entityName: 'Cash', trId: '12345678' },
    { date: '01/16/2018', checkNo: '', notes: '', amount: '(100)', isCredit: true, entityName: 'Bank', trId: '87654321' }];
    console.log("Data retrieved", trs);
    callback(null, {
        "statusCode": 200,
        "headers": {
            "my_header": "my_value",
            "Access-Control-Allow-Origin": "*"
        },
        "body": JSON.stringify(trs),
        "isBase64Encoded": false
    });*/
}