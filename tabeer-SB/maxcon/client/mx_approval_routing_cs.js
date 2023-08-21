/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
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
 * This file is applied on the Sales order for specifically handling sales order approval flow
 *
 * Version    Date         Author     Remarks
 * 1.00       14-11-2019   Nabeel       Initial version
 */

define(['N/currentRecord', 'N/search', 'N/record'], function (nsCurrentRecord, nsSearch, nsRecord) {


	function fieldChanged(context) {
		if (context.fieldId == 'custbody_so_type') {
			handleField(context);
		}
	}

	function handleField(context) {
		try {
			var WITH_DISCOUNT = 3;
			var value = context.currentRecord.getValue({
				fieldId: context.fieldId
			});

			if (value == WITH_DISCOUNT) {
				context.currentRecord.setValue({
					fieldId: 'orderstatus',
					value: 'A'
				});
			}
			var orderStatusField = context.currentRecord.getField({
				fieldId: 'orderstatus'
			});
			orderStatusField.isDisabled = (value == WITH_DISCOUNT);

		}
		catch (e) {
			console.error('Error::handleField', e);
		}
	}

	function submitForApproval() {
		try {
			debugger;
			var currentRecord = nsCurrentRecord.get();
			var lookupResults = nsSearch.lookupFields({
				type: currentRecord.type,
				id: currentRecord.id,
				columns: ['salesrep']
			});

			var salesManager = getSalesManager(lookupResults.salesrep[0].value);

			nsRecord.submitFields({
				type: currentRecord.type,
				id: currentRecord.id,
				values: {
					'custbody_approver': salesManager,
					'custbody_approval_level': 1,
					'custbody_submit_for_approval': true
				}
			});
			window.location.reload();

		}
		catch (e) {
			console.error('Error:submitForApproval', e);
		}
	}

	function getSalesManager(salesRep) {
		var lookupResults = nsSearch.lookupFields({
			type: 'employee',
			id: salesRep,
			columns: ['custentity_employee_sales_manager']
		});
		var salesManager = lookupResults.custentity_employee_sales_manager.length > 0? lookupResults.custentity_employee_sales_manager[0].value : 425160;

		return salesManager;
	}

	return {
		fieldChanged: fieldChanged,
		submitForApproval: submitForApproval
	};
});