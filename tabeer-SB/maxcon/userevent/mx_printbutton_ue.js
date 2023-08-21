/**
 *@NApiVersion 2.0
 *@NScriptType UserEventScript
 *
 *
 * Copyright (c) 2016 Maxcon Solutions
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Maxcon ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Maxcon. *
 *
 * Purpose : This file is applied on transactions 
 *
 * Version    Date            Author           Remarks
 * 1.00       09-02-2020      Fatima          Initial Commit
 *
 */
define(['N/runtime', 'N/search', 'N/record'], function (runtime, search, record) {

    function beforeLoad(context) {
        try {
            var type = context.type;
            if (type == context.UserEventType.VIEW) {
                addbutton(context);
            }
            else if (type == context.UserEventType.PRINT || runtime.executionContext === runtime.ContextType.SUITELET) {
                getLineItems(context)
            }

        } catch (e) {
            log.error('ERROR in addButton', e)
        }
    };

    function addbutton(ctx) {
        var form = ctx.form;
        form.clientScriptModulePath = '../client/mx_printbutton_cs.js';
        form.addButton({ id: "custpage_printbutton", label: "Print Invoice", functionName: "printButton" })
    }
    function anotherLineItems(context) {
        try {
            var recID = context.newRecord.id;
            var itemGroupSearch = search.create({
                type: "transaction",
                filters:
                     [
                        ["type", "anyof", "CustInvc"],
                        "AND",
                        ["internalid", "anyof", recID],
                        "AND",
                        ["custcol23", "noneof", "@NONE@"]
                    ],
                columns:
                    /* [

                        search.createColumn({
                            name: "amount",
                            summary: "SUM",
                            label: "amount"
                        }),
                        search.createColumn({
                            name: "custcol23",
                            summary: "GROUP",
                            label: "Item Group"
                        }),
                        search.createColumn({
                            name: "location",
                            summary: "GROUP",
                            label: "Location"
                        }),
                        search.createColumn({
                            name: "memo",
                            summary: "MAX",
                            label: "Memo"
                        }),

                        search.createColumn({
                            name: "quantity",
                            summary: "GROUP",
                            label: "Quantity"
                        }),
                        search.createColumn({
                            name: "rate",
                            summary: "SUM",
                            label: "Item Rate"
                        })
                    ] */
                    [
                        search.createColumn({
                           name: "custcol23",
                           summary: "GROUP",
                           label: "Item Group"
                        }),
                        search.createColumn({
                           name: "location",
                           summary: "GROUP",
                           label: "Location"
                        }),
                        search.createColumn({
                           name: "memo",
                           summary: "MAX",
                           label: "Memo"
                        }),
                        search.createColumn({
                           name: "custcol_dev_qty",
                           summary: "GROUP",
                           label: "[DEV] qty"
                        }),
                        search.createColumn({
                           name: "custcol_dev_rate",
                           summary: "SUM",
                           label: "[DEV] rate"
                        }),
                        search.createColumn({
                           name: "custcol_dev_amount",
                           summary: "SUM",
                           label: "[DEV] amount"
                        })
                     ]
            });
            var result = getResults(itemGroupSearch.run());
            var itemArray = [];
            for (var i = 0; i < result.length; i++) {

                var item = result[i].getText({ name: 'custcol23', summary: "GROUP" });
                /* var total = result[i].getValue({ name: 'amount', summary: "SUM" }); */
                var description = result[i].getValue({ name: 'memo', summary: "MAX" });
                var loc = result[i].getText({ name: 'location', summary: "GROUP" });
                /* var qty = result[i].getValue({ name: 'quantity', summary: "GROUP" });
                var Rate = result[i].getValue({ name: 'rate', summary: "SUM" }); */
                var total = result[i].getValue({ name: 'custcol_dev_amount', summary: "SUM" });
                var qty = result[i].getValue({ name: 'custcol_dev_qty', summary: "GROUP" });
                var Rate = result[i].getValue({ name: 'custcol_dev_rate', summary: "SUM" });

                var itemInfo = {
                    itemGroup: item,
                    memo: description,
                    location: loc,
                    quantity: qty,
                    rate: Rate,
                    amount: total

                }
                itemArray.push(itemInfo)
                return itemArray;
            }

        }
        catch (e) {
            log.error("ERROR: Another line items", e)
        }
    }
    function getLineItems(context) {
        try {
            var rec = context.newRecord;
            var itemCount = rec.getLineCount({ 'sublistId': 'item' });
            var location = rec.getText("location")
            var tableItems = '<table width="100%" table-layout="fixed" padding-top="20px">'

            tableItems += '<thead >'
            tableItems += '<tr >'
            tableItems += '<td colspan="6"><b>Item</b></td>'
            tableItems += '<td colspan="10" color="black"><p align="left"><b>Description</b></p></td>'
            tableItems += '<td align="right" colspan="4"><b>Rate</b></td>'
            tableItems += '<td  align="right" colspan="4"><b>Amount</b></td>'
            tableItems += '<td align="center" colspan="6"><b>Location</b></td>'
            tableItems += '</tr>'
            tableItems += '</thead >'
            var values = anotherLineItems(context)
            log.debug("values", values)
            if (values) {
                log.debug("values.length", values.length)
                //for (var i = 1; i <= values.length; i++) {
                for (var i = 0; i < values.length; i++) {
                    if (values.length == 1) {
                        var items = values[0].itemGroup;
                        var description = values[0].memo;
                        var rate = values[0].rate;
                        var amount = values[0].amount;
                        var locations = values[0].location;
                    }
                    else {
                        var items        = values[i].itemGroup;
                        var description  = values[i].memo;
                        var rate         = values[i].rate;
                        var amount       = values[i].amount;
                        var locations    = values[i].location;

                    }

                    tableItems += '<tr >'
                    tableItems += '<td colspan="6">' + items + '</td>'
                    tableItems += '<td colspan="10" color="black"><p align="left">' + description + '</p></td>'
                    tableItems += '<td align="right" colspan="4">' + rate + '</td>'
                    tableItems += '<td  align="right" colspan="4">' + formatAmount(amount) + '</td>'
                    tableItems += '<td align="left" colspan="6">' + locations + '</td>'
                    tableItems += '</tr>'

                }

            }

            for (var i = 0; i < itemCount; i++) {
                var items = rec.getSublistText({
                    "sublistId": 'item',
                    "fieldId": "item",
                    "line": i
                });
                var itemGroup = rec.getSublistValue({
                    "sublistId": 'item',
                    "fieldId": "custcol23",
                    "line": i
                });
                log.debug("itemGroup", itemGroup)
                var description = rec.getSublistValue({
                    "sublistId": 'item',
                    "fieldId": "description",
                    "line": i
                });
                var rate = rec.getSublistValue({
                    "sublistId": 'item',
                    "fieldId": "rate",
                    "line": i
                });
                var amount = rec.getSublistValue({
                    "sublistId": 'item',
                    "fieldId": "amount",
                    "line": i
                });
                if (isNull(itemGroup)){
                    if (description.length > 500) {
                        var chunks = chunkString(description, 1000)
                        //Row Started
                        tableItems += '<tr >'
                        tableItems += '<td colspan="6">' + items + '</td>'
                        tableItems += '<td colspan="10" color="black"><p align="left">' + chunks[0] + '</p></td>'
                        tableItems += '<td align="right" colspan="4">' + formatAmount(rate) + '</td>'
                        tableItems += '<td  align="right" colspan="4">' + formatAmount(amount) + '</td>'
                        tableItems += '<td align="left" colspan="6"><p align="center">' + location + '</p></td>'
                        tableItems += '</tr>'
                        for (var chunk = 1; chunk < chunks.length; chunk++) {
                            tableItems += '<tr >'
                            tableItems += '<td colspan="6"></td>'
                            tableItems += '<td colspan="10" color="black"><p align="left">' + chunks[chunk] + '</p></td>'
                            tableItems += '<td align="right" colspan="4"></td>'
                            tableItems += '<td  align="right" colspan="4"></td>'
                            tableItems += '<td align="left" colspan="6"></td>'
                            tableItems += '</tr>'
                        }
                    }
                    else {
                        tableItems += '<tr >'
                        tableItems += '<td colspan="6">' + items + '</td>'
                        tableItems += '<td colspan="10" color="black"><p align="left">' + description + '</p></td>'
                        tableItems += '<td align="right" colspan="4">' + rate + '</td>'
                        tableItems += '<td  align="right" colspan="4">' + formatAmount(amount) + '</td>'
                        tableItems += '<td align="left" colspan="6"><p align="center">' + location + '</p></td>'
                        tableItems += '</tr>'

                    }
                }
            }
            tableItems += '</table>'
            var form = context.form;
            var subsidiaryAddress = form.addField({
                id: 'custpage_itemtable',
                type: 'RICHTEXT',
                label: 'item table'
            });
            subsidiaryAddress.defaultValue = tableItems;
        }
        catch (e) {
            log.error("ERROR: Item table", e)
        }
    }
    function chunkString(str, length) {
        return str.match(new RegExp('.{1,' + length + '}', 'g'));
    }
    function isNull(stValue) {
        return (stValue == '') || (stValue == null) || (stValue == undefined);
        }
    function formatAmount(nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }
    function getResults(set) {
        var results = [];
        var i = 0;
        while (true) {
            var result = set.getRange({ "start": i, "end": i + 1000 });
            if (!result) break;
            results = results.concat(result);
            if (result.length < 1000) break;
            i += 1000;
        }
        return results;
    }
    function isValue(stValue) {
        if ((stValue == '') || (stValue == null) || (stValue == undefined)) {
            return " ";
        } else {
            return stValue;
        }
    }
    return {
        beforeLoad: beforeLoad,
    }

});