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
     * Customer Payment Record
     */
    var Base = (function (_super) {
        __extends(Base, _super);
        function Base() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Base;
    }(Transaction_1.TransactionBase));
    Base.recordType = record.Type.CUSTOMER_PAYMENT;
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "customer", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "checknum", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], Base.prototype, "payment", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "paymentmethod", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], Base.prototype, "autoapply", void 0);
    exports.Base = Base;
    var ApplySublist = (function (_super) {
        __extends(ApplySublist, _super);
        function ApplySublist() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ApplySublist;
    }(Sublist_1.SublistLine));
    __decorate([
        Sublist_1.SublistFieldType.currency
    ], ApplySublist.prototype, "amount", void 0);
    __decorate([
        Sublist_1.SublistFieldType.checkbox
    ], ApplySublist.prototype, "apply", void 0);
    __decorate([
        Sublist_1.SublistFieldType.freeformtext
    ], ApplySublist.prototype, "refnum", void 0);
    exports.ApplySublist = ApplySublist;
});
