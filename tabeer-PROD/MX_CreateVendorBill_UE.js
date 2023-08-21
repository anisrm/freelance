/**
 *@NApiVersion 2.x
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
 * with Maxcon. 
 *
 * Version    Date            Author           Remarks
 * 1.00      08-12-2020       Shivendra        
 *
 */
define(['N/record','N/search'], function (record,search) {


    function afterSubmit(context) {

        try {
			//if (context.type !== context.UserEventType.CREATE)
			//	return;
			var rec = context.newRecord;
			var soId = rec.id;
			log.debug({
			title: 'Debug Entry',
			details: 'soId : ' + soId
			});
			var soData = [];
			
            var soRec = record.load({type: 'salesorder', id: soId});
			var loc = soRec.getValue({
			fieldId: 'location'
			});
			
			var sub = soRec.getValue({
			fieldId: 'subsidiary'
			});
			
			var lineCount = soRec.getLineCount({sublistId: 'item'});
			for(var i=0;i<lineCount;i++){
				var item = soRec.getSublistValue({sublistId: 'item', fieldId: 'item', line: i});
				var qty = soRec.getSublistValue({sublistId: 'item', fieldId: 'quantity', line: i});
				var vatTax = soRec.getSublistValue({sublistId: 'item', fieldId: 'custcol21', line: i});
				var vendor = soRec.getSublistValue({sublistId: 'item', fieldId: 'custcol20', line: i});
				var cost = soRec.getSublistValue({sublistId: 'item', fieldId: 'custcol15', line: i});
				var bill = soRec.getSublistValue({sublistId: 'item', fieldId: 'custcol_bill_id', line: i});
                var passengerName = soRec.getSublistValue({sublistId: 'item', fieldId: 'custcol22', line: i});
                var pnr = soRec.getSublistValue({sublistId: 'item', fieldId: 'custcol2', line: i});
                var passPort = soRec.getSublistValue({sublistId: 'item', fieldId: 'custcol1', line: i});
				soData.push({
					item: item,
					qty: qty,
					vatTax: vatTax,
					vendor: vendor,
					location: loc,
					soId: soId,
					bill: bill,
					unitCost: cost,
					subsidiary: sub,
                    passengerName: passengerName,
                    pnr: pnr,
                    passPort: passPort
				});
			}
			// log.debug({
			// title: 'Debug Entry',
			// details: 'Data : ' + JSON.stringify(soData)
			// });
			createBill(soData,soId);
        }
        catch (e) {
            log.error("afterSubmit", e)
        }
    }
     //Create bill
	function createBill(soData,id) {
		log.debug({
			title: 'createBill',
			details: 'Data : ' + JSON.stringify(soData)
			});
		var vendorList = getUniqueVendor(soData);
		log.debug({
			title: 'VendorList',
			details: 'VendorList : ' + JSON.stringify(vendorList)
			});
		var vendorBill = [];
		
		if(vendorList){
			for(var j=0;j<vendorList.length;j++){
				if(vendorList[j] && vendorList[j]!=''){
					try{
					var rec = record.create({
					type: 'vendorbill',
					isDynamic: true
					});
					rec.setValue({
					fieldId: 'entity',
					value: vendorList[j]
					});
					
					rec.setValue({
					fieldId: 'custbody_salesorder_id',
					value: id
					});
					
					for(k=0;k<soData.length;k++){
					
					    if(k==0){
						rec.setValue({
						fieldId: 'subsidiary',
						value: soData[k].subsidiary
						});
						
						rec.setValue({
						fieldId: 'location',
						value: soData[k].location
						});
						}
						if(vendorList[j]==soData[k].vendor && soData[k].bill==''){
						
						rec.selectNewLine({
						sublistId: 'item'
						});
						rec.setCurrentSublistValue({
						sublistId: 'item',
						fieldId: 'item',
						value: soData[k].item
						});
						rec.setCurrentSublistValue({
						sublistId: 'item',
						fieldId: 'quantity',
						value: soData[k].qty
						});
						rec.setCurrentSublistValue({
						sublistId: 'item',
						fieldId: 'rate',
						value: soData[k].unitCost
						});
						rec.setCurrentSublistValue({
						sublistId: 'item',
						fieldId: 'taxcode',
						value: soData[k].vatTax
						});
                        rec.setCurrentSublistValue({
						sublistId: 'item',
						fieldId: 'custcol22',
						value: soData[k].passengerName
						});
                          rec.setCurrentSublistValue({
						sublistId: 'item',
						fieldId: 'custcol2',
						value: soData[k].pnr
						});
                          rec.setCurrentSublistValue({
						sublistId: 'item',
						fieldId: 'custcol1',
						value: soData[k].passPort
						});
						rec.commitLine({
						sublistId: 'item'
						});
						
						}
					} // for loop
				var recordId = rec.save();
				log.debug({
				title: 'recordId',
				details: 'Bill id : ' + recordId
				});
				vendorBill.push({
					id: recordId,
					vendorId: vendorList[j]
				});
					}
					catch (e) {
					log.error({ title: 'ERROR-209', details: 'Error - Name: ' + e.name + ', Message: ' + e.message });
					continue;
					}
				
				
			}
			} //for(var j=0;j<vendorList.length;j++){
		}
		log.debug({
					title: 'Debug Entry',
					details: 'vendorBill : '+vendorBill.length
					});
		if(vendorBill.length > 0){
			var soRecord = record.load({type: 'salesorder', id: id});
			var count = soRecord.getLineCount({sublistId: 'item'});
			log.debug({
					title: 'Debug Entry',
					details: 'count : ' + count +'vendorBill '+vendorBill.length
					});
				for(var t=0;t<count;t++){
					var vendorid = soRecord.getSublistValue({sublistId: 'item', fieldId: 'custcol20', line: t});
					log.debug({
					title: 'Debug Entry',
					details: 'vendorid : ' + vendorid
					});
					for(var n=0;n<vendorBill.length;n++){
						if(vendorid==vendorBill[n].vendorId){
						var tranNumber = search.lookupFields({
						type: search.Type.VENDOR_BILL,
						id: vendorBill[n].id,
						columns: ['transactionnumber']
						});
						tranNumberObj = tranNumber.transactionnumber;
					//	tranNumber = tranNumberObj.value;
						log.debug({
						title: 'tranNumber',
						details: 'tranNumber : ' + tranNumberObj
						});
						soRecord.setSublistValue({sublistId: 'item', fieldId: 'custcol_bill_id', line: t, value: tranNumberObj});
						}
				    }
				}
			soRecord.save();
		}
	}
	function getUniqueVendor(soData) {

		var results = [];
		for (var i = 0; i < soData.length; i++) {
			var value = soData[i].vendor;
			if (results.indexOf(value) == -1) {
				results.push(value);
			}
		}
		return results;
	}
    return {
        afterSubmit: afterSubmit
    }

});