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
define([ 'N/runtime'], function (runtime) {

    function beforeLoad(context) {
        try {
            addbutton(context);
         
        } catch (e) {
            log.error('ERROR in addButton', e)
        }
    };

    function addbutton(ctx) {

        var rec = ctx.newRecord;
        var form = ctx.form;
        var type = ctx.type;
       form.clientScriptModulePath = '../client/mx_printbutton_cs.js';
        

        if (type == ctx.UserEventType.VIEW) {
            var userRole = runtime.getCurrentUser().role;
            log.debug('userRole', userRole);
            // if (userRole == 3) {
            form.addButton({ id: "custpage_printbutton", label: "Print Invoice", functionName: "printButton" });
        }
    }

    return {
        beforeLoad: beforeLoad,
    }

});