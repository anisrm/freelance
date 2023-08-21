/**
 * Company           Explore Consulting
 * Copyright         2017 Explore Consulting, LLC
 * Description       For transactions, modifies the class and location based on the currently selected customer
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 **/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "./NFT-SS2-0.5.4/DataAccess/EC_nsdal", "./NFT-SS2-0.5.4/DataAccess/CustomerBase"], function (require, exports, nsdal, cust) {
    "use strict";
    //region TS helpers
    /**
     * these TS compiler generated functions are added here because I was getting undefined symbol errors when using it
     * in client scripts. It appears NS ignores any code before the define() call when dynamically loading client scripts and
     * eval'ing them. TS defaults to spitting this code out in every file. I also edited them a bit to pass TS compiler checks
     * TODO: create a common library for the TS emitted helper functions and import it as needed?
     * @private
     */
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = false ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    //endregion
    //region Types
    var Customer = /** @class */ (function (_super) {
        __extends(Customer, _super);
        function Customer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            nsdal.FieldType.select
        ], Customer.prototype, "custentity_class", void 0);
        __decorate([
            nsdal.FieldType.select
        ], Customer.prototype, "custentity_location", void 0);
        return Customer;
    }(cust.Base));
    var TransactionLineItem = /** @class */ (function (_super) {
        __extends(TransactionLineItem, _super);
        function TransactionLineItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            nsdal.SublistFieldType.select
        ], TransactionLineItem.prototype, "class", void 0);
        __decorate([
            nsdal.SublistFieldType.select
        ], TransactionLineItem.prototype, "location", void 0);
        return TransactionLineItem;
    }(nsdal.SublistLine));
    /**
     * General representation of a transaction record type
     * Note we can't use normal sublist representation here because the record is a 'currentrecord' not a normal
     * NetSuiteRecord. Hence the 'item' sublist is processed using more primitive constructs elsewhere
     */
    var Transaction = /** @class */ (function (_super) {
        __extends(Transaction, _super);
        function Transaction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            nsdal.FieldType.select
        ], Transaction.prototype, "entity", void 0);
        __decorate([
            nsdal.FieldType.select
        ], Transaction.prototype, "class", void 0);
        return Transaction;
    }(nsdal.NetsuiteCurrentRecord));
    var EC;
    (function (EC) {
        // variable to hold the execution mode (e.g. 'create', 'edit')
        var mode = null;
        var customerList = [];
        // Executed when a field is changed by a user or client side call.
        EC.fieldChanged = function (ctx) {
        };
        // Executed when an existing line is selected.
        EC.lineInit = function (ctx) {
        };
        EC.pageInit = function (ctx) {
            //  only manipulate the class dropdown if we're in create mode (so we don't reset users in edit mode on a record)
            mode = ctx.mode;
            if (mode === 'edit' || mode === 'copy') {
            }
            // @TODO/dg: Step through each line, setting defaults for each one
            // Save the customer for each line, so we can watch for changes
        };
        // Executed after the submit button is pressed but before the form is submitted.
        EC.saveRecord = function (ctx) { return true; };
        // Executed after a sublist has been inserted, removed, or edited.
        EC.sublistChanged = function (ctx) {
        };
        // Executed on transaction forms when a field that sources information from another field is modified.
        EC.postSourcing = function (ctx) {
        };
        // Executed when removing an existing line from an edit sublist.
        EC.validateDelete = function (ctx) { return true; };
        // Executed when a field is about to be changed by a user or client side call.
        // @TODO/dg: Figure out what the overwrite rules are. Do we only set values if they are empty? If the customer just changed, we want to overwrite regardless.
        // This is a mess of native NS and NFT. The current record should be converted to an nsdal object
        EC.validateField = function (ctx) {
            if (ctx.sublistId === 'item' && ctx.fieldId === 'entity') {
                var customerId = ctx.currentRecord.getCurrentSublistValue({ sublistId: 'item', fieldId: 'entity' });
                var customer = new Customer(+customerId);
                ctx.currentRecord.setCurrentSublistValue({ sublistId: 'item', fieldId: 'location', value: customer.custentity_location });
                ctx.currentRecord.setCurrentSublistValue({ sublistId: 'item', fieldId: 'class', value: customer.custentity_class });
                //      ctx.currentRecord.commitLine({sublistId: 'item'})
            }
            return true;
        };
        // Executed when you insert a line into an edit sublist.
        EC.validateInsert = function (ctx) {
            return true;
        };
        // Executed before a line is added to an inline editor sublist or editor sublist.
        EC.validateLine = function (ctx) {
            return true;
        };
    })(EC || (EC = {}));
    return EC;
});
