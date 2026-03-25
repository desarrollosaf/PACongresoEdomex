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
exports.Agenda = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sede_entity_1 = require("./sede.entity");
let Agenda = class Agenda extends sequelize_typescript_1.Model {
};
exports.Agenda = Agenda;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(36),
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Agenda.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], Agenda.prototype, "fecha_hora", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], Agenda.prototype, "fecha_hora_inicio", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], Agenda.prototype, "fecha_hora_fin", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT('long'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Agenda.prototype, "descripcion", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => sede_entity_1.Sede),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(36),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Agenda.prototype, "sede_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Agenda.prototype, "transmision", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT('long'),
        allowNull: true,
    }),
    __metadata("design:type", Object)
], Agenda.prototype, "liga", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Agenda.prototype, "estatus_transmision", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], Agenda.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], Agenda.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], Agenda.prototype, "deleted_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => sede_entity_1.Sede),
    __metadata("design:type", sede_entity_1.Sede)
], Agenda.prototype, "sede", void 0);
exports.Agenda = Agenda = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'agendas',
        underscored: true,
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    })
], Agenda);
//# sourceMappingURL=agenda.entity.js.map