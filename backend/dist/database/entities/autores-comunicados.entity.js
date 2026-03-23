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
exports.AutoresComunicados = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const comunicados_entity_1 = require("./comunicados.entity");
const integrante_legislatura_entity_1 = require("./integrante-legislatura.entity");
let AutoresComunicados = class AutoresComunicados extends sequelize_typescript_1.Model {
    comunicado_id;
    comunicado;
    tipo_autor_id;
    autor_id;
    autor;
};
exports.AutoresComunicados = AutoresComunicados;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(36),
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4
    }),
    __metadata("design:type", String)
], AutoresComunicados.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => comunicados_entity_1.Comunicados),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(36),
        allowNull: false
    }),
    __metadata("design:type", String)
], AutoresComunicados.prototype, "comunicado_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => comunicados_entity_1.Comunicados, { foreignKey: 'comunicado_id', targetKey: 'id' }),
    __metadata("design:type", comunicados_entity_1.Comunicados)
], AutoresComunicados.prototype, "comunicado", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(36),
        allowNull: true
    }),
    __metadata("design:type", String)
], AutoresComunicados.prototype, "tipo_autor_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => integrante_legislatura_entity_1.IntegranteLegislatura),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(36),
        allowNull: false
    }),
    __metadata("design:type", String)
], AutoresComunicados.prototype, "autor_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => integrante_legislatura_entity_1.IntegranteLegislatura, { foreignKey: 'autor_id', targetKey: 'id', constraints: false }),
    __metadata("design:type", integrante_legislatura_entity_1.IntegranteLegislatura)
], AutoresComunicados.prototype, "autor", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true
    }),
    __metadata("design:type", Date)
], AutoresComunicados.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'updated_at', type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", Date)
], AutoresComunicados.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true
    }),
    __metadata("design:type", Date)
], AutoresComunicados.prototype, "deleted_at", void 0);
exports.AutoresComunicados = AutoresComunicados = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'autores_comunicados',
        underscored: true,
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    })
], AutoresComunicados);
//# sourceMappingURL=autores-comunicados.entity.js.map