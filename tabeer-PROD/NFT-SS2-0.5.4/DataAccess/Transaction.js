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
define(["require", "exports", "./Record"], function (require, exports, Record_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Fields common to all transactions in NS
     */
    var TransactionBase = (function (_super) {
        __extends(TransactionBase, _super);
        function TransactionBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TransactionBase;
    }(Record_1.NetsuiteRecord));
    __decorate([
        Record_1.FieldType.select
    ], TransactionBase.prototype, "customform", void 0);
    __decorate([
        Record_1.FieldType.select
    ], TransactionBase.prototype, "department", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], TransactionBase.prototype, "email", void 0);
    __decorate([
        Record_1.FieldType.select
    ], TransactionBase.prototype, "entity", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], TransactionBase.prototype, "externalid", void 0);
    __decorate([
        Record_1.FieldType.select
    ], TransactionBase.prototype, "location", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], TransactionBase.prototype, "memo", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], TransactionBase.prototype, "otherrefnum", void 0);
    __decorate([
        Record_1.FieldType.select
    ], TransactionBase.prototype, "postingperiod", void 0);
    __decorate([
        Record_1.FieldType.select
    ], TransactionBase.prototype, "salesrep", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], TransactionBase.prototype, "status", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], TransactionBase.prototype, "statusRef", void 0);
    __decorate([
        Record_1.FieldType.select
    ], TransactionBase.prototype, "subsidiary", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], TransactionBase.prototype, "tranid", void 0);
    __decorate([
        Record_1.FieldType.date
    ], TransactionBase.prototype, "trandate", void 0);
    exports.TransactionBase = TransactionBase;
});
