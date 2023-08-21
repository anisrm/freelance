// Create a standard NetSuite record
function createRecord(datain)
{
var err = new Object();
// Validate if mandatory record type is set in the request
if (!datain.recordtype)
{
err.status = "failed";
err.message= "missing recordtype";
return err;
}
var record = nlapiCreateRecord(datain.recordtype);

for (var fieldname in datain)
{
if (datain.hasOwnProperty(fieldname))
{
if (fieldname != 'recordtype' && fieldname != 'id')
{
var value = datain[fieldname];
if (value && typeof value != 'object') // ignore other type of parameters
{
record.setFieldValue(fieldname, value);
}
}
}
}
nlapiLogExecution('DEBUG','zip='+datain.zip);
record.selectNewLineItem('addressbook');
record.setCurrentLineItemValue('addressbook','city', datain.city);
record.setCurrentLineItemValue('addressbook','zip', datain.zip);
record.setCurrentLineItemValue('addressbook', 'country', 'US');
record.setCurrentLineItemValue('addressbook','label','billing address');
record.commitLineItem('addressbook');

record.selectNewLineItem('contact');
record.setCurrentLineItemValue('contact','contactrole','-10′);
record.setCurrentLineItemValue('contact', 'firstname', datain.firstname);
record.commitLineItem('contact');

var recordId = nlapiSubmitRecord(record);
nlapiLogExecution('DEBUG','id='+recordId);

var nlobj = nlapiLoadRecord(datain.recordtype,recordId);
return nlobj;
}