"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sede = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const agenda_entity_1 = require("./agenda.entity");
let Sede = class Sede extends sequelize_typescript_1.Model {
};
exports.Sede = Sede;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(36),
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Sede.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT('long'),
        allowNull: true,
    }),
    __metadata("design:type", Object)
], Sede.prototype, "sede", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], Sede.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], Sede.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => agenda_entity_1.Agenda),
    __metadata("design:type", Array)
], Sede.prototype, "agendas", void 0);
exports.Sede = Sede = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'sedes',
        underscored: true,
        timestamps: false,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    })
], Sede);
//# sourceMappingURL=sede.entity.js.map