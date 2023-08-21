/**
 *@NApiVersion 2.0
 *@NScriptType Suitelet
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
 * Version    Date                    Author           Remarks
 * 1.00       09-02-2020             Fatima Wazir    Initial version
 *
 */
define(['N/ui/serverWidget', 'N/record', 'N/log', 'N/url', 'N/render', 'N/search', 'N/format', 'N/encode', 'N/file'], function (ui, record, log, url, render, search, format, encode, file) {
    /**
    *
    * @param {*} set
    */
    /**
      * main function for suitelet
      * @param {object} ctx
      */

    function onRequest(ctx) {
        try {
            var req = ctx.request;
            var res = ctx.response;
            var params = req.parameters;
            log.debug('params', params);

            generateTemplate(ctx);
        }
        catch (e) {
            log.error('ERROR onRequest', e)
        }

    }

    function generateTemplate(ctx) {
        var req = ctx.request;
        var res = ctx.response;
        var recID = req.parameters.id;
        log.debug('recID', recID)
        var type = req.parameters.rectype;
        log.debug('type', type)

        if (type == 'invoice') {
			var invRec = record.load({
                type: record.Type.INVOICE,
                id: recID
            });
			var subId = invRec.getValue({'fieldId': 'subsidiary'});
			
			
            var templateFileId = 126812;
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
                    [

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
                    ]
            });
            var result = getResults(itemGroupSearch.run());
            log.debug('result', result)
            var itemArray=[];
            // var itemGroup = [];
            // var amount = [];
            // var memo = [];
            // var location = [];
            // var quantity = [];
            // var rate = [];
            for (var i = 0; i < result.length; i++) {

                var item = result[i].getText({ name: 'custcol23', summary: "GROUP" });
                var total = result[i].getValue({ name: 'amount', summary: "SUM" });
                var description = result[i].getValue({ name: 'memo',summary: "MAX" });
                var loc = result[i].getText({ name: 'location', summary: "GROUP" });
                var qty = result[i].getValue({ name: 'quantity', summary: "GROUP" });
                var Rate = result[i].getValue({ name: 'rate', summary: "SUM" });
                // itemGroup.push(item);
                // memo.push(description);
                // location.push(loc);
                // quantity.push(qty);
                // rate.push(Rate);
                // amount.push(total);

                var itemInfo = {
                    itemGroup:item,
                    memo: description,
                    location:loc,
                    quantity:qty,
                    rate:Rate,
                    amount:total

                }
                itemArray.push(itemInfo)
                log.debug('itemArray',itemArray)
            }
            
        }

        // else if(type=='check'){

        //     var templateFileId = 1134;
        // }

        var xmlTemplateFile = file.load({ id: templateFileId });
        var renderer = render.create();
        renderer.templateContent = xmlTemplateFile.getContents();
		renderer.addRecord('subsidiary', record.load({
                type: record.Type.SUBSIDIARY,
                id: subId
            }));
        renderer.addRecord('record', record.load({
            type: type,
            id: recID
        }));
        renderer.addCustomDataSource({
            format: render.DataSource.OBJECT,
            alias: "data",
            data: {
                valueItem: itemArray,
               
            }
        });

        var xml = renderer.renderAsString();
        var file1 = render.xmlToPdf({ xmlString: xml });
        ctx.response.renderPdf(xml);

    }
    return {
        onRequest: onRequest,
    }

});
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