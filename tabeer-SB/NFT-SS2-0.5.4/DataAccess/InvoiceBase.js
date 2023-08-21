/**
 * NetSuite generic Transaction record
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "./Sublist", "N/record", "./Transaction", "./Record"], function (require, exports, Sublist_1, record, Transaction_1, Record_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * NetSuite Invoice Record
     */
    var Base = (function (_super) {
        __extends(Base, _super);
        function Base() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Base;
    }(Transaction_1.TransactionBase));
    Base.recordType = record.Type.INVOICE;
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "account", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], Base.prototype, "amountpaid", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], Base.prototype, "amountremaining", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "approvalstatus", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], Base.prototype, "balance", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "billaddr1", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "billaddr2", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "billaddr3", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "billphone", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "billstate", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "billzip", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "billaddress", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "currency", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "customform", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], Base.prototype, "discountamount", void 0);
    __decorate([
        Record_1.FieldType.date
    ], Base.prototype, "discountdate", void 0);
    __decorate([
        Record_1.FieldType.date
    ], Base.prototype, "duedate", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "fob", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], Base.prototype, "giftcertapplied", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], Base.prototype, "handlingcost", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "handlingtaxcode", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], Base.prototype, "istaxable", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "leadsource", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "linkedtrackingnumbers", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "promocode", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], Base.prototype, "tobeemailed", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], Base.prototype, "tobeprinted", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], Base.prototype, "tobefaxed", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], Base.prototype, "total", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], Base.prototype, "subtotal", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "taxitem", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "trackingnumbers", void 0);
    exports.Base = Base;
    /**
     * The 'item' sublist on invoices
     */
    var ItemSublist = (function (_super) {
        __extends(ItemSublist, _super);
        function ItemSublist() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ItemSublist;
    }(Sublist_1.SublistLine));
    __decorate([
        Sublist_1.SublistFieldType.freeformtext
    ], ItemSublist.prototype, "account", void 0);
    __decorate([
        Sublist_1.SublistFieldType.currency
    ], ItemSublist.prototype, "amount", void 0);
    __decorate([
        Sublist_1.SublistFieldType.textarea
    ], ItemSublist.prototype, "description", void 0);
    __decorate([
        Sublist_1.SublistFieldType.checkbox
    ], ItemSublist.prototype, "istaxable", void 0);
    __decorate([
        Sublist_1.SublistFieldType.select
    ], ItemSublist.prototype, "item", void 0);
    __decorate([
        Sublist_1.SublistFieldType.integernumber
    ], ItemSublist.prototype, "linenumber", void 0);
    __decorate([
        Sublist_1.SublistFieldType.select
    ], ItemSublist.prototype, "price", void 0);
    __decorate([
        Sublist_1.SublistFieldType.float
    ], ItemSublist.prototype, "quantity", void 0);
    __decorate([
        Sublist_1.SublistFieldType.float
    ], ItemSublist.prototype, "rate", void 0);
    __decorate([
        Sublist_1.SublistFieldType.date
    ], ItemSublist.prototype, "revrecstartdate", void 0);
    __decorate([
        Sublist_1.SublistFieldType.date
    ], ItemSublist.prototype, "revrecenddate", void 0);
    __decorate([
        Sublist_1.SublistFieldType.select
    ], ItemSublist.prototype, "taxcode", void 0);
    __decorate([
        Sublist_1.SublistFieldType.percent
    ], ItemSublist.prototype, "taxrate1", void 0);
    __decorate([
        Sublist_1.SublistFieldType.select
    ], ItemSublist.prototype, "units", void 0);
    exports.ItemSublist = ItemSublist;
});
