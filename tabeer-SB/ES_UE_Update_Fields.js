/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record'],
/**
 * @param {record} record
 */
function(record) {
    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function beforeSubmit(scriptContext) {
		if (scriptContext.type == scriptContext.UserEventType.CREATE || scriptContext.type == scriptContext.UserEventType.EDIT) {
			var parent = scriptContext.newRecord.getValue({fieldId: 'parent'});
			if (parent) {
				var parentRecord = record.load({type: record.Type.CUSTOMER, id: parent});
				scriptContext.newRecord.setValue({fieldId: 'pricelevel', value: parentRecord.getValue({fieldId: 'pricelevel'})});
				scriptContext.newRecord.setValue({fieldId: 'receivablesaccount', value: parentRecord.getValue({fieldId: 'receivablesaccount'})});
			}
		}
    }
    return {
        beforeSubmit: beforeSubmit
    };
    
});
