/**
 * Represents Sublists and their field access. Sublists use a different api than body fields in NS.
 * Note that in NFT-SS1.0 we collapsed the sublist and body descriptors into a common codebase. Decided not to do
 * that here (yet) in interest of code clarity. Also the fact that it's only two copies (usually use the rule of
 * three's for DRY).
 */
define(["require", "exports", "N/format", "../EC_Logger", "../moment", "../lodash"], function (require, exports, format, LogManager, moment, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var log = LogManager.getLogger('nsdal');
    /*
     note that numeric sublist fields seem to do ok with the defaultdescriptor with the exception of percent fields.
     this differs from body fields behavior - it seems body fields required the numericDescriptor (see numericDescriptor
     in Record.ts
     */
    /**
     * decorators for sublist fields. Adorn your class properties with these to bind your class property name with
     * the specific behavior for the type of field it represents in NetSuite.
     */
    var SublistFieldType;
    (function (SublistFieldType) {
        SublistFieldType.checkbox = defaultSublistDescriptor;
        SublistFieldType.currency = defaultSublistDescriptor; //_.partial(formattedSublistDescriptor, format.Type.CURRENCY)
        SublistFieldType.date = _.partial(dateTimeSublistDescriptor, format.Type.DATE);
        SublistFieldType.datetime = _.partial(dateTimeSublistDescriptor, format.Type.DATETIME);
        SublistFieldType.email = defaultSublistDescriptor;
        SublistFieldType.freeformtext = defaultSublistDescriptor;
        SublistFieldType.decimalnumber = defaultSublistDescriptor; // _.partial(formattedSublistDescriptor, format.Type.FLOAT)
        SublistFieldType.float = defaultSublistDescriptor; //_.partial(formattedSublistDescriptor, format.Type.FLOAT)
        SublistFieldType.hyperlink = defaultSublistDescriptor;
        SublistFieldType.image = defaultSublistDescriptor;
        SublistFieldType.integernumber = defaultSublistDescriptor; // _.partial(formattedSublistDescriptor, format.Type.INTEGER)
        SublistFieldType.longtext = defaultSublistDescriptor;
        SublistFieldType.multiselect = defaultSublistDescriptor;
        SublistFieldType.percent = _.partial(formattedSublistDescriptor, format.Type.PERCENT);
        SublistFieldType.select = defaultSublistDescriptor;
        SublistFieldType.textarea = defaultSublistDescriptor;
    })(SublistFieldType = exports.SublistFieldType || (exports.SublistFieldType = {}));
    /**
     * Generic property descriptor with basic default algorithm that exposes the field value directly with no
     * other processing.
     * @returns an object property descriptor to be used
     * with Object.defineProperty
     */
    function defaultSublistDescriptor(target, propertyKey) {
        log.debug('creating default descriptor', "field: " + propertyKey);
        return {
            get: function () {
                var options = {
                    sublistId: this.sublistId,
                    line: this.line,
                    fieldId: propertyKey
                };
                log.debug('getting sublist value', options);
                return this.nsrecord.getSublistValue(options);
            },
            set: function (value) {
                // ignore undefined's
                if (value !== undefined)
                    this.nsrecord.setSublistValue({
                        sublistId: this.sublistId,
                        line: this.line,
                        fieldId: propertyKey,
                        value: value
                    });
                else
                    log.debug("ignoring field [" + propertyKey + "]", 'field value is undefined');
            },
            enumerable: true //default is false
        };
    }
    exports.defaultSublistDescriptor = defaultSublistDescriptor;
    /**
     * Generic sublist property descriptor with algorithm for date handling. Surfaces dates as moment() instances
     * note: does not take into account timezone
     * @param {string} formatType the NS field type (e.g. 'date')
     * @param target
     * @param propertyKey
     * @returns  an object property descriptor to be used
     * with decorators
     */
    function dateTimeSublistDescriptor(formatType, target, propertyKey) {
        return {
            get: function () {
                var value = this.nsrecord.getSublistValue({
                    sublistId: this.sublistId,
                    line: this.line,
                    fieldId: propertyKey
                });
                log.debug("transforming field format type [" + formatType + "]", "with value " + value);
                // ensure we don't return moments for null, undefined, etc.
                return value ? moment(format.parse({ type: formatType, value: value })) : value;
            },
            set: function (value) {
                // allow null to flow through, but ignore undefined's
                if (value !== undefined) {
                    var asDate;
                    // the value needs to either be a moment already, or a moment compatible string else null
                    if (moment.isMoment(value))
                        asDate = value.toDate();
                    else
                        asDate = value ? moment(value).toDate() : null;
                    this.nsrecord.setSublistValue({
                        sublistId: this.sublistId,
                        line: this.line,
                        fieldId: propertyKey,
                        value: asDate
                    });
                }
                else
                    log.debug("not setting sublist " + propertyKey + " field", 'value was undefined');
            },
            enumerable: true //default is false
        };
    }
    exports.dateTimeSublistDescriptor = dateTimeSublistDescriptor;
    /**
     * Generic property descriptor with algorithm for values that need to go through the NS format module
     * note: does not take into account timezone
     * @param {string} formatType the NS field type (e.g. 'date')
     * @param target
     * @param propertyKey
     * @returns  an object property descriptor to be used
     * with decorators
     */
    function formattedSublistDescriptor(formatType, target, propertyKey) {
        return {
            get: function () {
                log.debug("getting formatted field [" + propertyKey + "]");
                var value = this.nsrecord.getSublistValue({
                    sublistId: this.sublistId,
                    line: this.line,
                    fieldId: propertyKey
                });
                log.debug("transforming field [" + propertyKey + "] of type [" + formatType + "]", "with value " + value);
                // ensure we don't return moments for null, undefined, etc.
                // returns the 'raw' type which is a string or number for our purposes
                return value ? format.parse({ type: formatType, value: value }) : value;
            },
            set: function (value) {
                var formattedValue = undefined;
                // allow null to flow through, but ignore undefined's
                if (value !== undefined) {
                    switch (formatType) {
                        // ensure numeric typed fields get formatted to what netsuite needs
                        // in testing with 2016.1 fields like currency had to be a number formatted specifically (e.g. 1.00
                        // rather than 1 or 1.0 for them to be accepted without error
                        case format.Type.CURRENCY:
                        case format.Type.CURRENCY2:
                        case format.Type.FLOAT:
                        case format.Type.INTEGER:
                        case format.Type.NONNEGCURRENCY:
                        case format.Type.NONNEGFLOAT:
                        case format.Type.POSCURRENCY:
                        case format.Type.POSFLOAT:
                        case format.Type.POSINTEGER:
                        case format.Type.RATE:
                        case format.Type.RATEHIGHPRECISION:
                            formattedValue = Number(format.format({ type: formatType, value: value }));
                            break;
                        default:
                            formattedValue = format.format({ type: formatType, value: value });
                    }
                    log.debug("setting sublist field [" + propertyKey + ":" + formatType + "]", "to formatted value [" + formattedValue + "] (unformatted vale: " + value + ")");
                    if (value === null)
                        this.nsrecord.setSublistValue({
                            sublistId: this.sublistId,
                            line: this.line,
                            fieldId: propertyKey,
                            value: null
                        });
                    else
                        this.nsrecord.setSublistValue({
                            sublistId: this.sublistId,
                            line: this.line,
                            fieldId: propertyKey,
                            value: formattedValue
                        });
                }
                else
                    log.info("not setting sublist " + propertyKey + " field", 'value was undefined');
            },
            enumerable: true //default is false
        };
    }
    exports.formattedSublistDescriptor = formattedSublistDescriptor;
    /**
     * creates a sublist whose lines are of type T
     */
    var Sublist = (function () {
        function Sublist(sublistLineType, rec, sublistId) {
            this.sublistLineType = sublistLineType;
            this.sublistId = sublistId;
            this.makeRecordProp(rec);
            log.debug('creating sublist', "type:" + sublistId + ", linecount:" + this.length);
            // create properties for all keys in our target type T
            for (var i = 0; i < this.length; i++) {
                this[i] = new sublistLineType(this.sublistId, this.nsrecord, i);
            }
        }
        Object.defineProperty(Sublist.prototype, "length", {
            /**
             * array-like length property (linecount)
             * @returns {number} number of lines in this list
             */
            get: function () {
                return this.nsrecord.getLineCount({ sublistId: this.sublistId });
            },
            enumerable: true,
            configurable: true
        });
        /**
         * adds a new line to this sublist
         * @param ignoreRecalc
         */
        Sublist.prototype.addLine = function (ignoreRecalc) {
            if (ignoreRecalc === void 0) { ignoreRecalc = true; }
            log.debug('inserting line', "sublist: " + this.sublistId + " insert at line:" + this.length);
            var insertAt = this.length;
            this[insertAt] = new this.sublistLineType(this.sublistId, this.nsrecord, insertAt);
            this.nsrecord.insertLine({
                sublistId: this.sublistId,
                line: insertAt,
                ignoreRecalc: ignoreRecalc
            });
            log.debug('line count after adding', this.length);
            return this[insertAt];
        };
        /**
         * commits the currently selected line on this sublist. When adding new lines you don't need to call this method
         */
        Sublist.prototype.commitLine = function () {
            log.debug('committing line', "sublist: " + this.sublistId);
            this.nsrecord.commitLine({ sublistId: this.sublistId });
        };
        Sublist.prototype.selectLine = function (line) {
            log.debug('selecting line', line);
            this.nsrecord.selectLine({ sublistId: this.sublistId, line: line });
        };
        /**
         * Defines a descriptor for nsrecord so as to prevent it from being enumerable. Conceptually only the
         * field properties defined on derived classes should be seen when enumerating
         * @param value
         */
        Sublist.prototype.makeRecordProp = function (value) {
            Object.defineProperty(this, 'nsrecord', {
                value: value,
                enumerable: false
            });
        };
        return Sublist;
    }());
    exports.Sublist = Sublist;
    /**
     * contains minimim requirements for a sublist line - 1. which sublist are we working with, 2. on which record
     * 3. which line on the sublist does this instance represent
     */
    var SublistLine = (function () {
        function SublistLine(sublistId, rec, line) {
            this.sublistId = sublistId;
            this.line = line;
            this.makeRecordProp(rec);
        }
        /**
         * Defines a descriptor for nsrecord so as to prevent it from being enumerable. Conceptually only the
         * field properties defined on derived classes should be seen when enumerating
         * @param value
         */
        SublistLine.prototype.makeRecordProp = function (value) {
            Object.defineProperty(this, 'nsrecord', {
                value: value,
                enumerable: false
            });
        };
        return SublistLine;
    }());
    exports.SublistLine = SublistLine;
});
