function setCustomForm(rec_type, rec_id){‌ var custinvc = record.load({‌ type: record.Type.INVOICE, id: rec_id }); var trans = custinvc.setValue({‌ fieldId: 'customform', value: 105 }); //If 105 is the ID of the Custom Form var recID = custinvc.save(); log.debug({‌ title: 'Record ID', details: recID }); }