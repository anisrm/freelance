var tvgUtils = (function() {
    /**
    * Helper function to retrieve all the results from a saved search. This function does not
    *     require the search to be ordered by internal id.
    */
    var getAllSearchResults = function (search) {
        var searchResults = search.runSearch();

        // resultIndex points to record starting current resultSet in the entire results array
        var resultIndex = 0;
        var resultStep = 1000; // Number of records returned in one step (maximum is 1000)
        var resultSet = null; // temporary variable used to store the result set
        var results = [];
        do {
            // fetch one result set
            resultSet = searchResults.getResults(resultIndex, resultIndex + resultStep);

            if (resultSet) {
                results = results.concat(resultSet);

                // increase pointer
                resultIndex = resultIndex + resultStep;
            }

        // once no records are returned we already got all of them
        } while (resultSet && resultSet.length > 0);

        return results;
    }

    /**
     * Helper function to pause scheduled scripts when the remaining governance units are
     *     less than the provided value
     */
    var pauseScriptIfNecessary = function (units) {
        var context = nlapiGetContext();

        if (context.getExecutionContext() == 'scheduled') {
            if (context.getRemainingUsage() <= units) {
                var state = nlapiYieldScript();

                if (state.status == 'FAILURE') {
                    nlapiLogExecution('ERROR', 'Failed to yield script, exiting: Reason = ' + state.reason + ' / Size = ' + state.size);
                    throw 'Failed to yield script';
                } else if (state.status == 'RESUME') {
                    nlapiLogExecution('AUDIT', 'Resuming script because of ' + state.reason + '.  Size = ' + state.size);
                } else {
                    nlapiLogExecution('DEBUG', 'Yield Status', state.status);
                }
            }
        }
    }

    return {
        getAllSearchResults: getAllSearchResults,
        pauseScriptIfNecessary: pauseScriptIfNecessary
    };
})();
