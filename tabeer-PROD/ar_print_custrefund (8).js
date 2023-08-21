/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* @ FILENAME      : ar_print_custrefund.js
* @ AUTHOR        : anis ur rehman
* @ DATE          : 23/02/2023
*
*
* This software is the confidential and proprietary information of
* anis - anisrm94@gmail.com
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function printCustRefund_beforeLoad(){
	var createPDFURL = nlapiResolveURL('SUITELET', 'customscript_ar_print_custrefund_sl', 'customdeploy_ar_print_custrefund_sl', false);
	createPDFURL += '&id=' + nlapiGetRecordId();
	createPDFURL += '&type=' + nlapiGetRecordType();
	newWindow = window.open(createPDFURL);
}

function printCustRefund_onClick(type, form){//customscript_ar_print_custrefund_ue
	if(type != 'delete'){
		form.addButton('custpage_print', 'Print Customer Refund', "printCustRefund_beforeLoad()");
		form.setScript('customscript_ar_print_custrefund_cs');
	}
}

function printCustRefund_printFile(request, response){
	//retrieve the record id passed to the Suitelet
	var recId			 = request.getParameter('id');
	var recType			 = request.getParameter('type');
	var custRefRec		 = nlapiLoadRecord(recType, recId);
	var tranId			 = custRefRec.getFieldValue('tranid');
	var arAccount		 = custRefRec.getFieldText('aracct');
	var tranDate		 = custRefRec.getFieldValue('trandate');
	var customer		 = nlapiEscapeXML(custRefRec.getFieldValue('entity'));
	var total			 = custRefRec.getFieldValue('total');
	var tranNum			 = custRefRec.getFieldValue('transactionnumber');
	var customer		 = custRefRec.getFieldText('customer');
	var balance			 = custRefRec.getFieldValue('balance');
	var account			 = custRefRec.getFieldText('account');
	var currency		 = custRefRec.getFieldText('currency');
	var exchRate		 = custRefRec.getFieldValue('exchangerate');
	var postingPeriod	 = custRefRec.getFieldText('postingperiod');
	var memo			 = isValue(custRefRec.getFieldValue('memo'));
	var subsid			 = custRefRec.getFieldText('subsidiary');
	var department		 = custRefRec.getFieldText('department');
	var location		 = custRefRec.getFieldText('location');
	var classs			 = custRefRec.getFieldText('class');

	var	headTable = '<table style="width: 100%;" table-layout="fixed">'
		headTable += '<tr>'
		headTable += '<td padding-top="50px" font-size="20px"><b>CUSTOMER REFUND</b></td>'
		headTable += '<td align="right" padding-top="-40px" ><img src="http://4654954-sb1.shop.netsuite.com/core/media/media.nl?id=46385&amp;c=&amp;h=F6b_ny4_dAH8BK391_NR_LAcFzx17L7MLv87xhg7hX0LyI5H" style="float: left; height:100%; width:100%" /></td>'
		headTable += '</tr>'
		headTable += '</table>'

	var	mainTable = '<table style="width: 100%;" table-layout="fixed" padding-bottom="30px">'
		mainTable += '<tr>'
		mainTable += '<td colspan="4"><b>TRANSACTION NUMBER</b></td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4"><b>A/R ACCOUNT</b></td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4"><b>DATE</b></td>'
		mainTable += '</tr>'
		mainTable += '<tr padding-bottom="10px">'
		mainTable += '<td colspan="4">'+tranNum+'</td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4"><p align="left">'+arAccount+'</p></td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4">'+tranDate+'</td>'
		mainTable += '</tr>'

		mainTable += '<tr>'
		mainTable += '<td colspan="4"><b>CUSTOMER</b></td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4"><b>REFUND AMOUNT</b></td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4"><b>POSTING PERIOD</b></td>'
		mainTable += '</tr>'
		mainTable += '<tr padding-bottom="10px">'
		mainTable += '<td colspan="4"><p align="left">'+customer+'</p></td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4">'+total+'</td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4">'+postingPeriod+'</td>'
		mainTable += '</tr>'

		mainTable += '<tr>'
		mainTable += '<td colspan="4"><b>BALANCE</b></td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4"><b>CURRENCY</b></td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4"><b>MEMO</b></td>'
		mainTable += '</tr>'
		mainTable += '<tr padding-bottom="10px">'
		mainTable += '<td colspan="4">'+balance+'</td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4">'+currency+'</td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4"><p align="left">'+memo+'</p></td>'
		mainTable += '</tr>'

		mainTable += '<tr>'
		mainTable += '<td colspan="4"><b>ACCOUNT</b></td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4"><b>EXCH. RATE</b></td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4"><b>SUBSIDIARY</b></td>'
		mainTable += '</tr>'
		mainTable += '<tr padding-bottom="10px">'
		mainTable += '<td colspan="4"><p align="left">'+account+'</p></td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4">'+exchRate+'</td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4">'+subsid+'</td>'
		mainTable += '</tr>'

		mainTable += '<tr>'
		mainTable += '<td colspan="4"><b>COST CENTRE</b></td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4"><b>LOCATION</b></td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4"><b>PROFIT CENTRE</b></td>'
		mainTable += '</tr>'
		mainTable += '<tr padding-bottom="10px">'
		mainTable += '<td colspan="4">'+department+'</td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4">'+location+'</td>'
		mainTable += '<td></td>'
		mainTable += '<td colspan="4">'+classs+'</td>'
		mainTable += '</tr>'
		mainTable += '</table>'

		var	lineTable = '<table style="width: 100%;" table-layout="fixed" border="1px" border-color="#B9B9B9">'
			lineTable += '<tr>'
			// mainTable += '<td colspan="4"></td>'
			lineTable += '<td background-color="#B9B9B9" valign="middle" align="center"><b>DATE</b></td>';
			lineTable += '<td background-color="#B9B9B9" valign="middle" align="center"><b>TYPE</b></td>';
			lineTable += '<td background-color="#B9B9B9" valign="middle" align="center"><b>REF. NO.</b></td>';
			lineTable += '<td background-color="#B9B9B9" valign="middle" align="center"><b>ORIG. AMOUNT</b></td>';
			lineTable += '<td background-color="#B9B9B9" valign="middle" align="center"><b>PAYMENT</b></td>';
			lineTable += '<td background-color="#B9B9B9" valign="middle" align="center"><p align="center"><b>AMOUNT REMAINING</b></p></td>';
			lineTable += '</tr>'

		var counInv = custRefRec.getLineItemCount('apply');
		nlapiLogExecution('debug', 'counInv', counInv);
		for(var x = 1; x <= counInv; x++){
			custRefRec.selectLineItem('apply', x);
			var apply_date			 = custRefRec.getCurrentLineItemValue('apply', 'applydate');
			var apply_type			 = custRefRec.getCurrentLineItemValue('apply', 'type');
			var apply_refNo			 = custRefRec.getCurrentLineItemValue('apply', 'refnum');
			var apply_origAmount	 = custRefRec.getCurrentLineItemValue('apply', 'total');
			var apply_payment		 = custRefRec.getCurrentLineItemValue('apply', 'amount');
			var apply_amtRemaining	 = custRefRec.getCurrentLineItemValue('apply', 'due');

			lineTable += '<tr>'
			// mainTable += '<td colspan="4"></td>'
			lineTable += '<td align="center">'+apply_date+'</td>';
			lineTable += '<td align="center">'+apply_type+'</td>';
			lineTable += '<td align="center">'+apply_refNo+'</td>';
			lineTable += '<td align="center">'+apply_origAmount+'</td>';
			lineTable += '<td align="center">'+apply_payment+'</td>';
			lineTable += '<td align="center">'+apply_amtRemaining+'</td>';
			lineTable += '</tr>'
		}
		lineTable += '</table>'


		
	var	endTable = '<table style="width: 100%;" table-layout="fixed">'
	endTable += '<tr>'
	endTable += '<td padding-top="50px">This is a system generated document, does not require any signature and stamp.</td>'
	endTable += '</tr>'
	endTable += '</table>'

	// build up BFO-compliant XML using well-formed HTML
	var xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
	xml += '<pdf>\n';
	xml += '<head>';
	xml += '<link name="Tahoma" type="font" subtype="truetype" src="https://system.eu2.netsuite.com/core/media/media.nl?id=768&amp;c=5020025&amp;h=47f0a7a4a2796f7ba9d5&amp;_xt=.ttf" src-bold="https://system.eu2.netsuite.com/core/media/media.nl?id=769&amp;c=5020025&amp;h=6fb3e190252834764d3e&amp;_xt=.ttf" bytes="2"/>';
	xml += '<macrolist>'
	xml += '<macro id="nlheader">'
	xml += headTable;
	xml += '</macro>'
	xml += '<macro id="nlfooter">'
	xml += '</macro>'
	xml += '</macrolist>'
	xml += '</head>';
	xml += '<body style="font-family: Tahoma; font-size:9pt" header="nlheader" header-height="15%" footer="nlfooter" footer-height="20%" padding="0.4in 0.5in 0.3in 0.3in" size="a4">\n';
	xml += mainTable;
	xml += lineTable;
	xml += endTable;
	xml += "</body>";
	xml += "\n</pdf>"

	// run the BFO library to convert the xml document to a PDF
	var file = nlapiXMLToPDF(xml);
	// set content type, file name, and content-disposition (inline means display in browser)
	response.setContentType('PDF', 'CustomerRefund_' + tranNum + '.pdf', 'inline');
	// write response to the client
	response.write(file.getValue());
}

function LogMsg(text){
	fxctr++;
	nlapiLogExecution('DEBUG', fx + fxctr, text);
}

function LogErr(text){
	fxctr++;
	nlapiLogExecution('ERROR', fx + fxctr, text);
}

function nullNumber(id){
	var ret;
	ret = parseFloat(id);
	if(isNaN(ret)){
		ret = 0;
	}
	return ret;
}

function isNull(stValue){
	return (stValue == '') || (stValue == null) || (stValue == undefined);
}

function isValue(stValue){
	if((stValue == '') || (stValue == null) || (stValue == undefined)) {
		return " ";
	}else{
		return stValue;
	}
}

function formatAmount(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while(rgx.test(x1)){
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function searchContact(companyName){
	var filters = new Array();
	var columns = new Array();
	var contactId = '';
	filters.push(new nlobjSearchFilter('company', null, 'anyof', companyName, null));
	columns.push(new nlobjSearchColumn('entityid'));
	var searchRecord = nlapiSearchRecord('contact', null, filters, columns);
	if (searchRecord && searchRecord != null) {
		contactId = searchRecord[0].getId();
	}

	return contactId;
}

function DateNow(){
	var monthNames = [
		"Jan", "Feb", "Mar",
		"Apr", "May", "Jun", "Jul",
		"Aug", "Sep", "Oct",
		"Nov", "Dec"
	];
	var today = new Date();
	var dd = today.getDay();
	var mm = today.getMonth();
	var yyyy = today.getFullYear();
	today = dd + ' ' + monthNames[mm] + ' ' + yyyy;
	return today;
}

function formatDate(date){
	var monthNames = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	];
	var today = new Date(date);
	var day = today.getDay() + 1;
	var monthIndex = today.getMonth();
	nlapiLogExecution('debug', 'monthindex', monthIndex)
	var year = today.getFullYear();

	return day + ' ' + monthNames[monthIndex + 2] + ' ' + year;
}