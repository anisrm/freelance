/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * Copyright (c) 2016 Maxcon Solutions
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Maxcon ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Maxcon. *
 *
 * This file is applied on the opportunity form for configuration of mandatory fields
 * 
 *
 *
 * Version   Date           Author      Remarks
 * 1.00      12-11-2019     Fatima       Initial version

 */


define(['N/currentRecord'], function (currentRecord) {



    function saveRecord(context) {
        var opprec = context.currentRecord;
        var status = opprec.getValue({ fieldId: 'entitystatus' });
        if (status == 9) {
            var reconnection = opprec.getText({ fieldId: 'custbody11' });
            if (!reconnection) {
                alert('please add value for date of reconnection');
                return false;
            }
        }

        if (status == 16) {
            var losscust = opprec.getText({ fieldId: 'winlossreason' });
            if (!losscust) {
                alert('please add value for loss reason');
                return false;
            }
        }

        var profit = opprec.getValue({ fieldId: 'class' });
        if (profit == 24 || profit == 25 || profit == 26 || profit == 3 || profit == 27 || profit == 28) {
            var destination = opprec.getText({ fieldId: 'custbody2' });
            if (!destination) {
                alert('please add value for city of destination');
                return false;
            }

        }
        if (profit == 37) {
            var Air = opprec.getText({ fieldId: 'custbody_inquiry_type' });
            var origin = opprec.getText({ fieldId: 'custbody_ops_airticket_origin' });
            var tdestination = opprec.getText({ fieldId: 'custbody_ops_airticket_destination' });
            var departure = opprec.getText({ fieldId: 'custbody_ops_airticket_departure_date' });
            var returndate = opprec.getText({ fieldId: 'custbody_ops_airticket_return_date' });

            if ((!Air) && (!origin) && (!tdestination) && (!departure) && (!returndate)) {
                alert('please add value for air ticket type');
                return false;
            }
        }
        if (profit == 34) {//uae visa
            var visa = opprec.getText({ fieldId: 'custbody12' });
            if (!visa) {
                alert('please add value for uae visa type');
                return false;
            }
        }
        return true;
    }

    function fieldChanged(context) {

        try {
            var opprec = context.currentRecord;
            var form = context.form;
            var fieldId = context.fieldId;
            var status = opprec.getValue({ fieldId: 'entitystatus' });
            log.error('status', status)
            var profit = opprec.getValue({ fieldId: 'class' });
            log.error('profit', profit)

            if (fieldId == 'entitystatus') {//status

                log.error('status', status)
                if (status == 9) {//on hold
                    opprec.getField({ fieldId: 'custbody11' }).isMandatory = true;
                }
                if (status == 16) {//lost cust
                    opprec.getField({ fieldId: 'winlossreason' }).isMandatory = true;
                }
            }
            if (fieldId == 'class') {//profit centre

                if (profit == 24 || profit == 25 || profit == 26 || profit == 3 || profit == 27 || profit == 28) {
                    opprec.getField({ fieldId: 'custbody2' }).isMandatory = true;

                }

                if (profit == 37) {//air ticket

                    opprec.getField({ fieldId: 'custbody_inquiry_type' }).isMandatory = true;
                    opprec.getField({ fieldId: 'custbody_ops_airticket_origin' }).isMandatory = true;
                    opprec.getField({ fieldId: 'custbody_ops_airticket_destination' }).isMandatory = true;
                    opprec.getField({ fieldId: 'custbody_ops_airticket_departure_date' }).isMandatory = true;
                    opprec.getField({ fieldId: 'custbody_ops_airticket_return_date' }).isMandatory = true;
                }
                if (profit == 34) {//uae visa type
                    opprec.getField({ fieldId: 'custbody12' }).isMandatory = true;
                }
            }
        }
        catch (error) {
            log.error('Error::disableField', error)
        }
    }
    return {

        fieldChanged: fieldChanged,
        saveRecord: saveRecord
    };
});