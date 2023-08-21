/**
 *  Represents a Transfer Order (transferorder) transaction type in NetSuite
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
     * NetSuite Transfer Order Record
     */
    var Base = (function (_super) {
        __extends(Base, _super);
        function Base() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Base;
    }(Transaction_1.TransactionBase));
    Base.recordType = record.Type.TRANSFER_ORDER;
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "class", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "createdfrom", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "employee", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], Base.prototype, "firmed", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "nexus", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "orderstatus", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], Base.prototype, "shipcomplete", void 0);
    __decorate([
        Record_1.FieldType.date
    ], Base.prototype, "shipdate", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], Base.prototype, "subtotal", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], Base.prototype, "total", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "transferlocation", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], Base.prototype, "useitemcostastransfercost", void 0);
    exports.Base = Base;
    /**
     * Sublist 'item' on the Tranfer Order record
     */
    var ItemSublist = (function (_super) {
        __extends(ItemSublist, _super);
        function ItemSublist() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ItemSublist;
    }(Sublist_1.SublistLine));
    __decorate([
        Sublist_1.SublistFieldType.currency
    ], ItemSublist.prototype, "amount", void 0);
    __decorate([
        Sublist_1.SublistFieldType.select
    ], ItemSublist.prototype, "catchupperiod", void 0);
    __decorate([
        Sublist_1.SublistFieldType.select
    ], ItemSublist.prototype, "commitinventory", void 0);
    __decorate([
        Sublist_1.SublistFieldType.checkbox
    ], ItemSublist.prototype, "deferrevrec", void 0);
    __decorate([
        Sublist_1.SublistFieldType.textarea
    ], ItemSublist.prototype, "description", void 0);
    __decorate([
        Sublist_1.SublistFieldType.date
    ], ItemSublist.prototype, "expectedreceiptdate", void 0);
    __decorate([
        Sublist_1.SublistFieldType.date
    ], ItemSublist.prototype, "expectedshipdate", void 0);
    __decorate([
        Sublist_1.SublistFieldType.checkbox
    ], ItemSublist.prototype, "isclosed", void 0);
    __decorate([
        Sublist_1.SublistFieldType.select
    ], ItemSublist.prototype, "item", void 0);
    __decorate([
        Sublist_1.SublistFieldType.integernumber
    ], ItemSublist.prototype, "linenumber", void 0);
    __decorate([
        Sublist_1.SublistFieldType.float
    ], ItemSublist.prototype, "quantity", void 0);
    __decorate([
        Sublist_1.SublistFieldType.float
    ], ItemSublist.prototype, "quantityavailable", void 0);
    __decorate([
        Sublist_1.SublistFieldType.float
    ], ItemSublist.prototype, "quantitybackordered", void 0);
    __decorate([
        Sublist_1.SublistFieldType.float
    ], ItemSublist.prototype, "quantitycommitted", void 0);
    __decorate([
        Sublist_1.SublistFieldType.float
    ], ItemSublist.prototype, "quantityfulfilled", void 0);
    __decorate([
        Sublist_1.SublistFieldType.float
    ], ItemSublist.prototype, "quantityreceived", void 0);
    __decorate([
        Sublist_1.SublistFieldType.currency
    ], ItemSublist.prototype, "rate", void 0);
    __decorate([
        Sublist_1.SublistFieldType.select
    ], ItemSublist.prototype, "units", void 0);
    exports.ItemSublist = ItemSublist;
});
