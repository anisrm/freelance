/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       02 Nov 2017     mariamagana
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function clientFieldChanged(type, name, linenum){

	var recordtype = nlapiGetRecordType();
	console.log('recordtype ' + recordtype);
	
	if (recordtype == 'vendorbill'){
		var type = 'item';
		var customer = 'customer';
	}
	else{
		var type = 'line';
		var customer = 'entity';
	}
	
	if ((type == 'item' || type == 'line') && name == 'custcol_invoice_no'){
		//running on vendor bill record - trigger script if user edits the invoice# column field - run lookup for customer name, location, class fields.
		var invoiceno = nlapiGetCurrentLineItemValue(type, 'custcol_invoice_no');
		
		if (invoiceno){
				
				var invoicefields = nlapiLookupField('invoice', invoiceno, ['entity', 'location', 'class'])
				console.log('entity ' + invoicefields['entity']); 
				console.log('location ' + invoicefields['location']); 
				console.log('class ' + invoicefields['class']); 
				if (invoicefields['entity']){
					nlapiSetCurrentLineItemValue(type, customer, invoicefields['entity']);
					
				}
				if (invoicefields['location']){
					nlapiSetCurrentLineItemValue(type, 'location', invoicefields['location']);

				}
				if (invoicefields['class']){
					nlapiSetCurrentLineItemValue(type, 'class', invoicefields['class']);

				}
			
		}
			
		
	} 
	
}

function userEventBeforeSubmit(type){

	var currentContext = nlapiGetContext();
	var recordtype = nlapiGetRecordType();
	var invoicearray = [];

	if (currentContext.getExecutionContext() != 'userinterface' && type == 'create'){ 
	//run script only when the context is not the UI
	if (recordtype == 'vendorbill'){
		var type = 'item';
		var customer = 'customer';
	}
	else{
		var type = 'line';
		var customer = 'entity';
	}
		var count = nlapiGetLineItemCount(type);
		
		for (var i = 1; i <= count; i++){
			var invoice = nlapiGetLineItemValue(type, 'custcol_invoice_no', i);
			invoicearray.push(invoice);

		}
		//get class, location, customer from invoice entered by user
		var invoicevalues = getInvoiceFields(invoicearray);
		nlapiLogExecution('DEBUG', 'invoicevalues', JSON.stringify(invoicevalues));
		
			for (var j = 1; j <= count; j++){

				var invoice = nlapiGetLineItemValue(type, 'custcol_invoice_no', j);
				nlapiLogExecution('DEBUG', 'invoice', invoice);

				if (invoice && invoice in invoicevalues){
					//if invoice value is found in the invoice array
					if (!nlapiGetLineItemValue(type, 'class', j) && invoicevalues[invoice].classification){
					
						nlapiLogExecution('DEBUG', 'setting class', invoicevalues[invoice].classification);
						nlapiSetLineItemValue(type, 'class', j, invoicevalues[invoice].classification);
					}
					//if (!nlapiGetLineItemValue(type, 'location', j) && invoicevalues[invoice].location){
					if (invoicevalues[invoice].location){
						//for csv imports, location should be set regardless of whether or not the user has selected a location value
						nlapiLogExecution('DEBUG', 'setting location', invoicevalues[invoice].location);
						nlapiSetLineItemValue(type, 'location', j, invoicevalues[invoice].location);
					}
					if (!nlapiGetLineItemValue(type, customer, j) && invoicevalues[invoice].customer){
						
						nlapiLogExecution('DEBUG', 'setting customer', invoicevalues[invoice].customer);
						nlapiSetLineItemValue(type, customer, j, invoicevalues[invoice].customer);
					}

				}

			}
			

	}
}

function getInvoiceFields(invoicearray){

	var filters = [];
	var columns = [];
	var obj = {}

	filters.push(new nlobjSearchFilter('internalid', null, 'anyof', invoicearray));
	filters.push(new nlobjSearchFilter('type', null, 'anyof', 'CustInvc'));
	filters.push(new nlobjSearchFilter('mainline', null, 'is', 'T'));

	columns.push(new nlobjSearchColumn('internalid'));
	columns.push(new nlobjSearchColumn('class'));
	columns.push(new nlobjSearchColumn('location'));
	columns.push(new nlobjSearchColumn('entity'));

	var results = nlapiSearchRecord('transaction', null, filters, columns);

	if (results){

		for( var i = 0; i < results.length; i++){

			var internalid = results[i].getValue('internalid');
			var classification = results[i].getValue('class');
			var location = results[i].getValue('location');
			var customer = results[i].getValue('entity');

			if (!(internalid in obj)) {
				obj[internalid] = {
						'classification' : classification,
						'location' : location,
						'customer' : customer

				};	
			}
		}
		nlapiLogExecution('DEBUG', 'obj', JSON.stringify(obj));
		return obj;
	}
}



