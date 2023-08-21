/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 *
 * @ FILENAME      : integrtion_cs.js
 * @ AUTHOR        : anis
 * @ DATE          : 02062023
 *
 * Copyright (c) 2021 Nana
 * All Rights Reserved.
 *
 * Updates:
 * Version          Date              Author          Remarks
 * 1.00             02/06/2023        anis            initial version
 *
 */
 define(['N/https'], function (https){

    function pageInit(context) {
        var dataFromRestlet = https.get('/app/site/hosting/restlet.nl?script=568&deploy=1');
        alert(dataFromRestlet.body);
    }

    return{
        pageInit: pageInit,
    };
});