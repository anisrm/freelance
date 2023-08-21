/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
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
 * This file is applied on the Sales order for:
 * -Handling sales order approval flow
 *
 * Version    Date         Author     Remarks
 * 1.00       14-11-2019   Nabeel       Initial version
 */

define(['N/record', 'N/runtime'], function (nsRecord, nsRuntime) {

	const WITH_DISCOUNT = 3;
	const GENERAL_MANAGER = 320;

	function beforeLoad(context) {
		var form = context.form;
		form.clientScriptModulePath = '../client/mx_approval_routing_cs';
		addButtons(context);
	}

	function afterSubmit(context) {
		var rec = context.newRecord;
		var form = context.form;
		var type = context.type;
		var submitForApproval = rec.getValue({
			fieldId: 'custbody_submit_for_approval'
		});
		var soType = rec.getValue({
			fieldId: 'custbody_so_type'
		});

		log.debug('afterSubmit', context.type);

		if(type == 'approve'){
			approveHandler(rec, form, submitForApproval, soType);
		}
	}

	function addButtons(context) {
		try {
			log.debug('addButtons', context.type);
			var rec = context.newRecord;
			var form = context.form;
			var type = context.type;

			var submitForApproval = rec.getValue({
				fieldId: 'custbody_submit_for_approval'
			});
			var soType = rec.getValue({
				fieldId: 'custbody_so_type'
			});

			//log.debug('submitForApproval', submitForApproval);
			//log.debug('soType', soType);

			var eventRouter = {
				'view': viewHandler,
				'edit': editHandler,
			};

			!!eventRouter[type] && eventRouter[type](rec, form, submitForApproval, soType);

		}
		catch (error) {
			log.error('Error::addButtons', error)
		}
	}

	function viewHandler(rec, form, submitForApproval, soType) {
		if (soType == WITH_DISCOUNT) {
			if (!submitForApproval) {
				form.addButton({
					id: 'custpage_submitforapproval',
					label: 'Submit For Approval',
					functionName: 'submitForApproval'
				});
			}
			else if (submitForApproval) {
				var approver = rec.getValue({
					fieldId: 'custbody_approver'
				});
				var currentUserObj = nsRuntime.getCurrentUser();

				if (approver == currentUserObj.id) {
					form.addButton({
						id: 'custpage_reject',
						label: 'Reject',
						functionName: 'reject'
					});
				}
			}
		}
	}

	function editHandler(rec, form, submitForApproval, soType) {
		if (soType == WITH_DISCOUNT && submitForApproval) {
			var field = form.getField({id: 'orderstatus'});
			field.updateDisplayType({
				displayType: 'DISABLED'
			});
		}
	}

	function approveHandler(rec, form, submitForApproval, soType) {
		log.debug('approveHandler');
		log.debug('soType == WITH_DISCOUNT', soType == WITH_DISCOUNT);
		log.debug('submitForApproval', submitForApproval);
		if (soType == WITH_DISCOUNT && submitForApproval) {
			var approvalLevel = rec.getValue({fieldId: 'custbody_approval_level'});
			log.debug('approvalLevel', approvalLevel);
			if(approvalLevel == 1){
				nsRecord.submitFields({
					type: rec.type,
					id: rec.id,
					values: {
						'custbody_approver': GENERAL_MANAGER,
						'custbody_approval_level': 2,
						'custbody_submit_for_approval': true,
						'orderstatus' : 'A'
					}
				});
			}

		}
	}

	return {
		beforeLoad: beforeLoad,
		afterSubmit: afterSubmit
	}

});