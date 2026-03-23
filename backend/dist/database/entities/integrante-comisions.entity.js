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
exports.IntegranteComision = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const comisiones_entity_1 = require("./comisiones.entity");
const integrante_legislatura_entity_1 = require("./integrante-legislatura.entity");
const tipo_cargo_comisiones_entity_1 = require("./tipo-cargo-comisiones.entity");
let IntegranteComision = class IntegranteComision extends sequelize_typescript_1.Model {
    comision_id;
    comision;
    integrante_legislatura_id;
    tipo_cargo_comision_id;
    tipo_cargo;
    integranteLegis;
};
exports.IntegranteComision = IntegranteComision;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.CHAR(36), primaryKey: true, defaultValue: sequelize_typescript_1.DataType.UUIDV4 }),
    __metadata("design:type", String)
], IntegranteComision.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => comisiones_entity_1.Comision),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.CHAR(36) }),
    __metadata("design:type", String)
], IntegranteComision.prototype, "comision_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => comisiones_entity_1.Comision, { foreignKey: 'comision_id' }),
    __metadata("design:type", comisiones_entity_1.Comision)
], IntegranteComision.prototype, "comision", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => integrante_legislatura_entity_1.IntegranteLegislatura),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.CHAR(36) }),
    __metadata("design:type", String)
], IntegranteComision.prototype, "integrante_legislatura_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => tipo_cargo_comisiones_entity_1.TipoCargoComision),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.CHAR(36) }),
    __metadata("design:type", String)
], IntegranteComision.prototype, "tipo_cargo_comision_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", Date)
], IntegranteComision.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", Date)
], IntegranteComision.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", Date)
], IntegranteComision.prototype, "deleted_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => tipo_cargo_comisiones_entity_1.TipoCargoComision, { foreignKey: 'tipo_cargo_comision_id' }),
    __metadata("design:type", tipo_cargo_comisiones_entity_1.TipoCargoComision)
], IntegranteComision.prototype, "tipo_cargo", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => integrante_legislatura_entity_1.IntegranteLegislatura, { foreignKey: 'integrante_legislatura_id' }),
    __metadata("design:type", integrante_legislatura_entity_1.IntegranteLegislatura)
], IntegranteComision.prototype, "integranteLegis", void 0);
exports.IntegranteComision = IntegranteComision = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'integrante_comisions', underscored: true, timestamps: true, paranoid: true, charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' })
], IntegranteComision);
//# sourceMappingURL=integrante-comisions.entity.js.map