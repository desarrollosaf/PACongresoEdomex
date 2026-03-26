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
exports.Comision = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const tipo_comisiones_entity_1 = require("./tipo-comisiones.entity");
const integrante_comisions_entity_1 = require("./integrante-comisions.entity");
let Comision = class Comision extends sequelize_typescript_1.Model {
    integrantes;
};
exports.Comision = Comision;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(36),
        primaryKey: true
    }),
    __metadata("design:type", String)
], Comision.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false
    }),
    __metadata("design:type", String)
], Comision.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => tipo_comisiones_entity_1.TipoComision),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(30),
        allowNull: false
    }),
    __metadata("design:type", String)
], Comision.prototype, "tipo_comision_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false
    }),
    __metadata("design:type", String)
], Comision.prototype, "alias", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: true
    }),
    __metadata("design:type", String)
], Comision.prototype, "importancia", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true
    }),
    __metadata("design:type", Date)
], Comision.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true
    }),
    __metadata("design:type", Date)
], Comision.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true
    }),
    __metadata("design:type", Date)
], Comision.prototype, "deleted_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => tipo_comisiones_entity_1.TipoComision),
    __metadata("design:type", tipo_comisiones_entity_1.TipoComision)
], Comision.prototype, "tipo", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => integrante_comisions_entity_1.IntegranteComision, {
        foreignKey: 'comision_id',
    }),
    __metadata("design:type", Array)
], Comision.prototype, "integrantes", void 0);
exports.Comision = Comision = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'comisions',
        underscored: true,
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    })
], Comision);
//# sourceMappingURL=comisiones.entity.js.map