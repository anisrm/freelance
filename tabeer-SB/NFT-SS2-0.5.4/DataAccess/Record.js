/**
 * Defines the nsdal handling for record body fields.
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "N/record", "N/format", "../EC_Logger", "../moment", "../lodash"], function (require, exports, record, format, LogManager, moment, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var log = LogManager.getLogger('nsdal');
    /**
     * Since the netsuite defined 'CurrentRecord' type has almost all the same operations as the normal 'Record'
     * we use this as our base class
     */
    var NetsuiteCurrentRecord = (function () {
        function NetsuiteCurrentRecord(rec, isDynamic, defaultValues) {
            // since the context of this.constructor is the derived class we're instantiating, using the line below we can
            // pull the 'static' recordType from the derived class and remove the need for derived classes to
            // define a constructor to pass the record type to super()
            var type = Object.getPrototypeOf(this).constructor.recordType;
            if (typeof rec === "number") {
                log.debug('loading existing record', "type:" + type + ", id:" + rec);
                this.makeRecordProp(record.load({
                    type: type,
                    id: rec,
                    isDynamic: isDynamic || false,
                    defaultValue: defaultValues
                }));
                this._id = this.nsrecord.id;
            }
            else if (!rec) {
                log.debug('creating new record', "type:" + type + "  isDyanamic:" + isDynamic + " defaultValues:" + defaultValues);
                this.makeRecordProp(record.create({ type: type, isDynamic: isDynamic, defaultValues: defaultValues }));
            }
            else {
                log.debug('using existing record', "type:" + rec.type + ", id:" + rec.id);
                this.makeRecordProp(rec);
                this._id = rec.id;
            }
        }
        Object.defineProperty(NetsuiteCurrentRecord.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Defines a descriptor for nsrecord so as to prevent it from being enumerable. Conceptually only the
         * field properties defined on derived classes should be seen when enumerating
         * @param value
         */
        NetsuiteCurrentRecord.prototype.makeRecordProp = function (value) {
            Object.defineProperty(this, 'nsrecord', {
                value: value,
                enumerable: false
            });
        };
        return NetsuiteCurrentRecord;
    }());
    exports.NetsuiteCurrentRecord = NetsuiteCurrentRecord;
    /**
     * A regular netsuite record.
     */
    var NetsuiteRecord = (function (_super) {
        __extends(NetsuiteRecord, _super);
        function NetsuiteRecord() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Persists this record to the NS database
         * @param enableSourcing
         * @param ignoreMandatoryFields
         * @returns {number}
         */
        NetsuiteRecord.prototype.save = function (enableSourcing, ignoreMandatoryFields) {
            var id = this.nsrecord.save({
                enableSourcing: enableSourcing,
                ignoreMandatoryFields: ignoreMandatoryFields
            });
            this._id = id;
            return id;
        };
        return NetsuiteRecord;
    }(NetsuiteCurrentRecord));
    exports.NetsuiteRecord = NetsuiteRecord;
    /**
     * Generic decorator factory with basic default algorithm that exposes the field value directly with no
     * other processing. If the property name ends with "Text" then the property will use getText()/setText()
     *
     * @returns a decorator that returns a property descriptor to be used
     * with Object.defineProperty
     */
    function defaultDescriptor(target, propertyKey) {
        var isTextField = _.endsWith(propertyKey, 'Text');
        var nsfield = isTextField ? _.trimEnd(propertyKey, 'Text') : propertyKey;
        return {
            get: function () {
                log.debug('field GET', nsfield + ", as text:" + isTextField);
                return isTextField ? this.nsrecord.getText({ fieldId: nsfield })
                    : this.nsrecord.getValue({ fieldId: nsfield });
            },
            set: function (value) {
                // ignore undefined's
                if (value !== undefined) {
                    if (isTextField)
                        this.nsrecord.setText({ fieldId: nsfield, text: value });
                    else
                        this.nsrecord.setValue({ fieldId: nsfield, value: value });
                }
                else
                    log.info("ignoring field [" + propertyKey + "]", 'field value is undefined');
            },
            enumerable: true //default is false
        };
    }
    exports.defaultDescriptor = defaultDescriptor;
    /**
     * Just like the default decriptor but calls Number() on the value. This exists for numeric types that
     * would blow up if you tried to assign number primitive values to a field. Don't know why - did various checks
     * with lodash and typeof to confirm the raw value was a number but only passing through Number() worked on sets.
     * Reads still seem to return a number.
     * @returns an object property descriptor to be used
     * with Object.defineProperty
     */
    function numericDescriptor(target, propertyKey) {
        return {
            get: function () {
                return this.nsrecord.getValue({ fieldId: propertyKey });
            },
            set: function (value) {
                // ignore undefined's
                if (value !== undefined)
                    this.nsrecord.setValue({ fieldId: propertyKey, value: Number(value) });
                else
                    log.info("ignoring field [" + propertyKey + "]", 'field value is undefined');
            },
            enumerable: true //default is false
        };
    }
    exports.numericDescriptor = numericDescriptor;
    /**
     * Generic property descriptor with algorithm for date handling. Surfaces dates as moment() instances
     * note: does not take into account timezone
     * @param {string} formatType the NS field type (e.g. 'date')
     * @param target
     * @param propertyKey
     * @returns  an object property descriptor to be used
     * with decorators
     */
    function dateTimeDescriptor(formatType, target, propertyKey) {
        return {
            get: function () {
                var value = this.nsrecord.getValue({ fieldId: propertyKey });
                log.debug("transforming field [" + propertyKey + "] of type [" + formatType + "]", "with value " + value);
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
                    log.debug("setting field [" + propertyKey + ":" + formatType + "]", "to date [" + asDate + "]");
                    this.nsrecord.setValue({ fieldId: propertyKey, value: asDate });
                }
                else
                    log.info("not setting " + propertyKey + " field", 'value was undefined');
            },
            enumerable: true //default is false
        };
    }
    /**
     * Generic property descriptor with algorithm for values that need to go through the NS format module on field
     * write. Returns plain getValue() on reads
     * note: does not take into account timezone
     * @param {string} formatType the NS field type (e.g. 'date')
     * @param target
     * @param propertyKey
     * @returns  an object property descriptor to be used
     * with decorators
     */
    function formattedDescriptor(formatType, target, propertyKey) {
        return {
            get: function () {
                return this.nsrecord.getValue({ fieldId: propertyKey });
            },
            set: function (value) {
                // allow null to flow through, but ignore undefined's
                if (value !== undefined) {
                    var formattedValue = format.format({ type: formatType, value: value });
                    log.debug("setting field [" + propertyKey + ":" + formatType + "]", "to formatted value [" + formattedValue + "] javascript type:" + typeof formattedValue);
                    if (value === null)
                        this.nsrecord.setValue({ fieldId: propertyKey, value: null });
                    else
                        this.nsrecord.setValue({ fieldId: propertyKey, value: formattedValue });
                }
                else
                    log.info("not setting " + propertyKey + " field", 'value was undefined');
            },
            enumerable: true //default is false
        };
    }
    /**
     *  Netsuite field types - decorate your model properties with these to tie netsuite field types to your
     *  model's field type.
     *  To get 'Text' rather than field value, suffix your property name with 'Text' e.g. 'afieldText' for the
     *  field 'afield'.
     */
    var FieldType;
    (function (FieldType) {
        FieldType.address = defaultDescriptor;
        FieldType.checkbox = defaultDescriptor;
        FieldType.currency = numericDescriptor;
        FieldType.date = _.partial(dateTimeDescriptor, format.Type.DATE);
        FieldType.datetime = _.partial(dateTimeDescriptor, format.Type.DATETIME);
        FieldType.email = defaultDescriptor;
        FieldType.freeformtext = defaultDescriptor;
        FieldType.float = numericDescriptor;
        FieldType.decimalnumber = FieldType.float;
        FieldType.hyperlink = defaultDescriptor;
        FieldType.image = defaultDescriptor;
        FieldType.integernumber = numericDescriptor;
        FieldType.longtext = defaultDescriptor;
        FieldType.multiselect = defaultDescriptor;
        FieldType.percent = _.partial(formattedDescriptor, format.Type.PERCENT);
        /**
         * NetSuite 'Select' field type.
         */
        FieldType.select = defaultDescriptor;
        FieldType.textarea = defaultDescriptor;
    })(FieldType = exports.FieldType || (exports.FieldType = {}));
});
