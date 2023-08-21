/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
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
 * Purpose : To generate PDF using suitelet
 *
 * Version    Date            Author           Remarks
 * 1.00       09-02-2020      Fatima          Initial Commit
 *
 */

define(['N/url', 'N/currentRecord'], function (nsUrl, nsCurrentRecord) {

    function pageInit() {
    }

    
    function printButton() {
        var currentRecord = nsCurrentRecord.get();
        var scriptURL = nsUrl.resolveScript({
            scriptId: 'customscript_mx_printbutton_sl',
            deploymentId: 'customdeploy_mx_printbutton_sl',
            params: {
                id: currentRecord.id,
                rectype: currentRecord.type
            },
            returnExternalUrl: false
        });
        newWindow = window.open(scriptURL);
    }
    return {
        pageInit: pageInit,
        printButton: printButton,
       
    };
});