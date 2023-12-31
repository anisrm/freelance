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
     * NetSuite Inventory Adjustment Record
     */
    var Base = (function (_super) {
        __extends(Base, _super);
        function Base() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Base;
    }(Transaction_1.TransactionBase));
    Base.recordType = record.Type.INVENTORY_ADJUSTMENT;
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "account", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "adjlocation", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "class", void 0);
    __decorate([
        Record_1.FieldType.datetime
    ], Base.prototype, "createddate", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "customer", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], Base.prototype, "estimatedtotalvalue", void 0);
    __decorate([
        Record_1.FieldType.datetime
    ], Base.prototype, "lastmodifieddate", void 0);
    exports.Base = Base;
    /**
     * Sublist 'inventory' on the Inventory Adjustment record.
     */
    var InventorySublist = (function (_super) {
        __extends(InventorySublist, _super);
        function InventorySublist() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InventorySublist;
    }(Sublist_1.SublistLine));
    __decorate([
        Sublist_1.SublistFieldType.float
    ], InventorySublist.prototype, "adjustqtyby", void 0);
    __decorate([
        Sublist_1.SublistFieldType.select
    ], InventorySublist.prototype, "class", void 0);
    __decorate([
        Sublist_1.SublistFieldType.freeformtext
    ], InventorySublist.prototype, "costingmethod", void 0);
    __decorate([
        Sublist_1.SublistFieldType.freeformtext
    ], InventorySublist.prototype, "currency", void 0);
    __decorate([
        Sublist_1.SublistFieldType.currency
    ], InventorySublist.prototype, "currentvalue", void 0);
    __decorate([
        Sublist_1.SublistFieldType.select
    ], InventorySublist.prototype, "department", void 0);
    __decorate([
        Sublist_1.SublistFieldType.freeformtext
    ], InventorySublist.prototype, "description", void 0);
    __decorate([
        Sublist_1.SublistFieldType.select
    ], InventorySublist.prototype, "item", void 0);
    __decorate([
        Sublist_1.SublistFieldType.select
    ], InventorySublist.prototype, "location", void 0);
    __decorate([
        Sublist_1.SublistFieldType.float
    ], InventorySublist.prototype, "newquantity", void 0);
    __decorate([
        Sublist_1.SublistFieldType.float
    ], InventorySublist.prototype, "quantityonhand", void 0);
    __decorate([
        Sublist_1.SublistFieldType.currency
    ], InventorySublist.prototype, "unitcost", void 0);
    __decorate([
        Sublist_1.SublistFieldType.select
    ], InventorySublist.prototype, "units", void 0);
    exports.InventorySublist = InventorySublist;
});
