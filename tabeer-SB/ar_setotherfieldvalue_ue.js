/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/record'], function(record) {

    function beforeSubmit(context) {
        log.debug('context.type', context.type);
        if (context.type == context.UserEventType.CREATE || context.type == context.UserEventType.EDIT || context.type == context.UserEventType.XEDIT){
            var newRecord = context.newRecord;

            // Get the value of the source field
            var roleFieldValue = newRecord.getValue({
                fieldId: 'custrecord_restricted_role_field'
            });

            // Set the value of the target field to the value of the source field
            if(roleFieldValue){
                newRecord.setValue({
                    fieldId: 'custrecord_restricted_role_intid',
                    value: roleFieldValue
                });
                /* var otherId = record.submitFields({
                    type: 'custrecord_target_field',
                    id: '4',
                    values: {
                    'custrecord_rating': '2'
                    }
                }); */
            }
            // Save the changes to the record
           // newRecord.save();
        }
    }


    return {
        beforeSubmit: beforeSubmit
    };
});
