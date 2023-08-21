/**
 * NS Base subsidiary record - contains definitions built in fields
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
define(["require", "exports", "./Record", "N/record", "./Sublist"], function (require, exports, Record_1, record, Sublist_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Base = (function (_super) {
        __extends(Base, _super);
        function Base() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Base;
    }(Record_1.NetsuiteRecord));
    Base.recordType = record.Type.SUBSIDIARY;
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "addr1", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "addr2", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "addr3", void 0);
    __decorate([
        Record_1.FieldType.freeformtext,
        Record_1.FieldType.select
    ], Base.prototype, "currency", void 0);
    __decorate([
        Record_1.FieldType.email
    ], Base.prototype, "email", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "externalid", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "fax", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], Base.prototype, "iselimination", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], Base.prototype, "isinactive", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "legalname", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "logo", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], Base.prototype, "name", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], Base.prototype, "override", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "parent", void 0);
    exports.Base = Base;
    /**
     * The addressbook 'subrecord'. In SS2.0 this is mostly treated as a normal record object.
     * However I caution against trying to create new instances of it, only passing an existing record
     * to the constructor. For example, on the customer record you can get an address sublist record
     * with Record.getSublistSubrecord() then pass the returned record to the Address constructor.
     * Currently this has only been tested for read access to aqddress properties defined below.
     */
    var AddressBase = (function (_super) {
        __extends(AddressBase, _super);
        function AddressBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AddressBase;
    }(Record_1.NetsuiteRecord));
    __decorate([
        Record_1.FieldType.freeformtext
    ], AddressBase.prototype, "addr1", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], AddressBase.prototype, "addr2", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], AddressBase.prototype, "addr3", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], AddressBase.prototype, "addressee", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], AddressBase.prototype, "addrphone", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], AddressBase.prototype, "addrtext", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], AddressBase.prototype, "attention", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], AddressBase.prototype, "city", void 0);
    __decorate([
        Record_1.FieldType.select
    ], AddressBase.prototype, "country", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], AddressBase.prototype, "state", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], AddressBase.prototype, "zip", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], AddressBase.prototype, "override", void 0);
    exports.AddressBase = AddressBase;
    var AccountBookDetail = (function (_super) {
        __extends(AccountBookDetail, _super);
        function AccountBookDetail() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AccountBookDetail;
    }(Sublist_1.SublistLine));
    __decorate([
        Sublist_1.SublistFieldType.select
    ], AccountBookDetail.prototype, "accountingbook", void 0);
    __decorate([
        Sublist_1.SublistFieldType.select
    ], AccountBookDetail.prototype, "currency", void 0);
    exports.AccountBookDetail = AccountBookDetail;
});
