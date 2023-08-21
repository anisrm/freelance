/**
 *@NApiVersion 2.x
 *@NScriptType MapReduceScript
 *@NModuleScope Public
 */
define(['N/record', 'N/search', 'N/runtime', 'N/file', '../lib/lodash.js'],
	function (nsRecord, nsSearch, nsRuntime, nsFile, _) {

		function getInputData() {
			try {
				var currentScript = nsRuntime.getCurrentScript();
				var fileId = currentScript.getParameter({
					name: 'custscript_csv_file'
				});
				if(!fileId){
					log.error('CSV File ID was not provided');
					return [];
				}
				var fileObj = nsFile.load({
					id: fileId
				});
				var fileContents = fileObj.getContents();
				fileContents = fileContents.split('\r\n');
				//The shift() method removes the first item of an array and change the original array.
				//The return value of the shift method is the removed item.
				fileContents.shift();
				log.debug('fileContents', fileContents);
				log.debug('fileContents length', fileContents.length);
				var fileContentsCompacted = _.compact(fileContents);
				log.debug('fileContentsCompacted length', fileContentsCompacted.length);

				return fileContentsCompacted;
			}
			catch (e) {
				log.error('Error::getInputData', e);
			}
		}

		function map(context) {
			try {
				var index = parseInt(context.key) + 1;
				log.debug('Processing JE Line: ' + index, context.value);
				updateJournalEntry(context);

			}
			catch (e) {
				log.error('Error::map', e);
			}
		}

		function reduce(context) {

		}

		function summarize(summary) {
			log.debug('Script ended', 'Printing Summary');
			var type = summary.toString();
			/*log.audit(type + ' Usage Consumed', summary.usage);
			log.audit(type + ' Concurrency Number ', summary.concurrency);
			log.audit(type + ' Number of Yields', summary.yields);*/

			var errors = {};
			summary.output.iterator().each(function(key, value) {
				log.debug(key, value);
				return true;
			});
		}

		/**
		 * This function handles the main logic for updating Journal Entry
		 * @returns {}
		 * @param context
		 */
		function updateJournalEntry(context) {
			try {
				var index = parseInt(context.key) + 1;
				var journalEntryLine = context.value.split(',');
				var jeRecord = nsRecord.load({
					type: 'journalentry',
					id: journalEntryLine[0]
				});
				var lineNumber = jeRecord.findSublistLineWithValue({
					sublistId: 'line',
					fieldId: 'line',
					value: journalEntryLine[3]
				});
				//log.debug('lineNumber', lineNumber);
				if(lineNumber > -1){
					var entity = jeRecord.setSublistValue({
						sublistId: 'line',
						fieldId: 'entity',
						line: lineNumber,
						value: journalEntryLine[4]
					});
				}
				else{
					context.write({
						key: 'Line was not found for CSV Line Number:' + index,
						value: context.value
					});
				}
				jeRecord.save({enableSourcing: true, ignoreMandatoryFields: true});
			}
			catch (e) {
				log.error('Error::updateJournalEntry', e);
				context.write({
					key: 'Error Occurred for CSV Line Number: ' + index,
					value: e.message
				});
			}
		}

		return {
			getInputData: getInputData,
			map: map,
			//reduce: reduce,
			summarize: summarize,
		};
	});
