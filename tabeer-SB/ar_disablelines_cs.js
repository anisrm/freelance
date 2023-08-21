/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 *
 * @ FILENAME      : ar_disablelinefields_cs.js
 * @ AUTHOR        : anis
 * @ DATE          : 21082023
 *
 * Copyright (c) 2021 Nana
 * All Rights Reserved.
 *
 * Updates:
 * Version          Date              Author          Remarks
 * 1.00             21/08/2023        anis            initial version
 *
 */
 define(['N/error', 'N/runtime', 'N/search'], function (error, runtime, search) {
    
    function fieldChanged(context){ 
        var currentRecord    = context.currentRecord;

        //if(context.mode == 'create' || context.mode == 'edit'){
            var listFieldId      = 'custrecord_restricted_role_field'; // Replace with the actual list field ID
            var targetFieldId    = 'custrecord_restricted_role_intid'; // Replace with the actual target field ID
        
            var selectedValue = currentRecord.getValue({ fieldId: listFieldId });
            log.debug('selectedValue', selectedValue);

            var sublistFieldName = context.fieldId;

            if(sublistFieldName === 'custrecord_restricted_role_field' && selectedValue){
                currentRecord.setValue({ fieldId: targetFieldId, value: selectedValue });
            }else{
                currentRecord.setValue({ fieldId: targetFieldId, value: null });
            }
        //}
    }
  
    function getRoleId(rolename){
        var roleSearchObj = search.create({
            type: "role",
            filters:
            [
            ["name","is", rolename]
            ],
            columns:
            [
            search.createColumn({
                name: "name",
                sort: search.Sort.ASC,
                label: "Name"
            }),
            search.createColumn({name: "internalid", label: "Internal ID"})
            ]
        });
        var srchResults    = roleSearchObj.run().getRange({"start": 0, "end": 1000});
        for(var i = 0; i < srchResults.length; i++){
            var roleintId   = srchResults[i].getValue({ name: 'internalid'});
        }
        log.debug('roleintId', roleintId);

        return roleintId;
    }

    return{
        fieldChanged: fieldChanged
    };
});