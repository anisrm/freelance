/**
 * NS Base jounral entry record - contains definitions for fields and sublists
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
    Base.recordType = record.Type.JOURNAL_ENTRY;
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "accountingbook", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], Base.prototype, "approved", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "department", void 0);
    __decorate([
        Record_1.FieldType.select
    ], Base.prototype, "subsidiary", void 0);
    exports.Base = Base;
    var LineSublist = (function (_super) {
        __extends(LineSublist, _super);
        function LineSublist() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LineSublist;
    }(Sublist_1.SublistLine));
    __decorate([
        Sublist_1.SublistFieldType.select
    ], LineSublist.prototype, "location", void 0);
    exports.LineSublist = LineSublist;
});
