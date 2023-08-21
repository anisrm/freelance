/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 *
 * @ FILENAME      : ar_disablecolumnfields_cs.js
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
define(['N/error', 'N/runtime', 'N/search'], function (error, runtime, search){
    function lineInit(context){
        var currentRecord    = context.currentRecord;
        var sublistName      = context.sublistId;

        var userRole         = runtime.getCurrentUser().role;
        log.debug('Internal ID of current user role: ' + userRole);

        if(sublistName === 'item'){
            /* currentRecord.setCurrentSublistValue({
                sublistId: sublistName,
                fieldId: 'partner',
                value: '55'
            }); */
            /* currentRecord.getField({
                sublistId: 'item', // Replace with the internal ID of your sublist
                fieldId: 'custcol22'//passenger name
            }).isDisabled = true; */
            //window.nlapiDisableField('custcol22', true);
            if(userRole == '1050' || userRole == '1044' || userRole == '8' ){
                window.nlapiDisableLineItemField('item', 'quantity', true);
                window.nlapiDisableLineItemField('item', 'description', true);
                window.nlapiDisableLineItemField('item', 'custcol22', true);
                //window.nlapiDisableLineItemField('item', 'item', true);
            }

            //TODO:
            if(checkRestrictedRoles(userRole) == true){
                log.debug('NOTE:', 'inside conditioned function');

                window.nlapiDisableLineItemField('item', 'quantity', true);
                window.nlapiDisableLineItemField('item', 'rate', true);
                window.nlapiDisableLineItemField('item', 'amount', true);
                window.nlapiDisableLineItemField('item', 'grossamt', true);
                window.nlapiDisableLineItemField('item', 'custcol14', true);
                window.nlapiDisableLineItemField('item', 'tax1amt', true);
                window.nlapiDisableLineItemField('item', 'taxcode', true);
            }
            //TODO:
        }
    }

/*     function checkRestrictedRoles(userRole){
        var roleSearchObj = search.create({
            type: "role",
            filters: [
                    ["internalid", "is", userRole]
            ],
            columns: [
                    search.createColumn({ name: "name", label: "Name"}),
                    search.createColumn({ name: "internalid", label: "Internal ID"})
            ]
         });
         var searchResultCount = roleSearchObj.runPaged().count;
         log.debug("roleSearchObj result count",searchResultCount);

         var srchResults     = roleSearchObj.run().getRange({"start": 0, "end": 1000});

         var intId_array = [];
         for(var i = 0; i < srchResults.length; i++){
            var intId = srchResults[i].getValue({ name: 'internalid'});
            intId_array.push(srchResults[i].getValue({ name: 'internalid'}));
        }
        log.debug("intId_array",intId_array);

        return intId_array.length > 0 ? true : false;
    } */

    function checkRestrictedRoles(userRole){
        var customrecord_ar_restrictedroles_parentSearchObj = search.create({
            type: "customrecord_ar_restrictedroles_parent",
            filters:
            [
                ["internalid", "anyof", "1"], 
                "AND", 
                ["custrecord_parent_fld.custrecord_restricted_role_intid", "is", userRole]
            ],
            columns:
            [
               search.createColumn({
                  name: "custrecord_restricted_role_intid",
                  join: "CUSTRECORD_PARENT_FLD",
                  label: "Role Internal Id"
               }),
               search.createColumn({
                  name: "custrecord_restricted_role_field",
                  join: "CUSTRECORD_PARENT_FLD",
                  label: "RoleX"
               }),
               /* search.createColumn({
                  name: "id",
                  join: "CUSTRECORD_PARENT_FLD",
                  label: "ID"
               }) */
            ]
         });

         var searchResultCount = customrecord_ar_restrictedroles_parentSearchObj.runPaged().count;
         log.debug("customrecord_ar_restrictedroles_parentSearchObj result count",searchResultCount);

         var srchResults     = customrecord_ar_restrictedroles_parentSearchObj.run().getRange({"start": 0, "end": 1000});

         var intId_array = [];
         for(var i = 0; i < srchResults.length; i++){
            intId_array.push(srchResults[i].getValue({
                name: "custrecord_restricted_role_intid",
                join: "CUSTRECORD_PARENT_FLD",
            }));
        }
        log.debug("intId_array",intId_array);

        return intId_array.length > 0 ? true : false;
    }

    return{
        //pageInit: pageInit,
        lineInit: lineInit,
    };
});