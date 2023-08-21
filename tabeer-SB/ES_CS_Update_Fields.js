/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record'],
/**
 * @param {search} search
 */
function(record) {
	/**
	 * Function to be executed when field is changed.
	 *
	 * @param {Object} scriptContext
	 * @param {Record} scriptContext.currentRecord - Current form record
	 * @param {string} scriptContext.sublistId - Sublist name
	 * @param {string} scriptContext.fieldId - Field name
	 * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
	 * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
	 *
	 * @since 2015.2
	 */
	function fieldChanged(scriptContext) {
		if (scriptContext.fieldId == 'parent') {
			var parent = scriptContext.currentRecord.getValue({fieldId: 'parent'});
			if (parent) {
				record.load.promise({type: record.Type.CUSTOMER, id: parent})
				.then(function(result){
					scriptContext.currentRecord.setValue({fieldId: 'pricelevel', value: result.getValue({fieldId: 'pricelevel'})});
					scriptContext.currentRecord.setValue({fieldId: 'receivablesaccount', value: result.getValue({fieldId: 'receivablesaccount'})});
				});
			}
		}
	}
    return {
    	fieldChanged: fieldChanged
    };
    
});