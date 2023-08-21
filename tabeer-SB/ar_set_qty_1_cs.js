/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

define(['N/record'], function (record) {

    function validateLine(context) {
        var currentRecord = context.currentRecord;
        var sublistName  = context.sublistId;

        // Check if the sublist is 'item'
        if (sublistName !== 'item') {
            return true;
        }

        // Get the current line number
        var line = currentRecord.getCurrentSublistIndex({ sublistId: 'item' });
        console.log('line', line);

        var itemVal = currentRecord.getSublistValue({
            sublistId: 'item',
            fieldId: 'item',
            line: line
        });
        console.log('itemVal', itemVal);
        var amountVal = currentRecord.getSublistValue({
            sublistId: 'item',
            fieldId: 'amount',
            line: line
        });
        console.log('amountVal', amountVal);
        var qtyVal = currentRecord.getSublistValue({
            sublistId: 'item',
            fieldId: 'quantity',
            line: line
        });
        console.log('qtyVal', qtyVal);
        var rateVal = currentRecord.getSublistValue({
            sublistId: 'item',
            fieldId: 'rate',
            line: line
        });
        console.log('rateVal', rateVal);

        // Set the value of the 'amount' field on the current line
        currentRecord.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'custcol_dev_qty',
            line: line,
            value: qtyVal || 1// New value
        });
        console.log('amountVal set', 'true');
        currentRecord.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'custcol_dev_amount',
            line: line,
            value: amountVal // New value
        });
        console.log('qtyVAl set', 'true');
        if(itemVal == 858){
            currentRecord.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'custcol_dev_rate',
                line: line,
                value: amountVal // New value
            });
            console.log('rateVal set', 'true');
        }else{
            currentRecord.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'custcol_dev_rate',
                line: line,
                value: rateVal // New value
            });
            console.log('rateVal set', 'true');
        }


        return true;
    }

    return {
        validateLine: validateLine
    };
});
