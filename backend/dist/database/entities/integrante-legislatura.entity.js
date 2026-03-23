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
exports.IntegranteLegislatura = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const legislatura_entity_1 = require("./legislatura.entity");
const diputado_entity_1 = require("./diputado.entity");
const partido_entity_1 = require("./partido.entity");
const distrito_entity_1 = require("./distrito.entity");
const integrante_comisions_entity_1 = require("./integrante-comisions.entity");
const autores_comunicados_entity_1 = require("./autores-comunicados.entity");
let IntegranteLegislatura = class IntegranteLegislatura extends sequelize_typescript_1.Model {
    legislatura_id;
    legislatura;
    diputado_id;
    diputado;
    partido_id;
    partido;
    distrito_id;
    distrito;
    fecha_ingreso;
    fecha_inicio;
    fecha_fin;
    comisiones;
    autores_comunicados;
};
exports.IntegranteLegislatura = IntegranteLegislatura;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.CHAR(36), primaryKey: true, defaultValue: sequelize_typescript_1.DataType.UUIDV4 }),
    __metadata("design:type", String)
], IntegranteLegislatura.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => legislatura_entity_1.Legislatura),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.CHAR(36) }),
    __metadata("design:type", String)
], IntegranteLegislatura.prototype, "legislatura_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => legislatura_entity_1.Legislatura),
    __metadata("design:type", legislatura_entity_1.Legislatura)
], IntegranteLegislatura.prototype, "legislatura", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => diputado_entity_1.Diputado),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.CHAR(36) }),
    __metadata("design:type", String)
], IntegranteLegislatura.prototype, "diputado_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => diputado_entity_1.Diputado),
    __metadata("design:type", diputado_entity_1.Diputado)
], IntegranteLegislatura.prototype, "diputado", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => partido_entity_1.Partido),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.CHAR(36) }),
    __metadata("design:type", String)
], IntegranteLegislatura.prototype, "partido_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => partido_entity_1.Partido),
    __metadata("design:type", partido_entity_1.Partido)
], IntegranteLegislatura.prototype, "partido", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => distrito_entity_1.Distrito),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.CHAR(36) }),
    __metadata("design:type", String)
], IntegranteLegislatura.prototype, "distrito_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => distrito_entity_1.Distrito),
    __metadata("design:type", distrito_entity_1.Distrito)
], IntegranteLegislatura.prototype, "distrito", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY }),
    __metadata("design:type", Date)
], IntegranteLegislatura.prototype, "fecha_ingreso", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY }),
    __metadata("design:type", Date)
], IntegranteLegislatura.prototype, "fecha_inicio", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY }),
    __metadata("design:type", Date)
], IntegranteLegislatura.prototype, "fecha_fin", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => integrante_comisions_entity_1.IntegranteComision, { foreignKey: 'integrante_legislatura_id' }),
    __metadata("design:type", Array)
], IntegranteLegislatura.prototype, "comisiones", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => autores_comunicados_entity_1.AutoresComunicados, { foreignKey: 'autor_id' }),
    __metadata("design:type", Array)
], IntegranteLegislatura.prototype, "autores_comunicados", void 0);
exports.IntegranteLegislatura = IntegranteLegislatura = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'integrante_legislaturas', underscored: true, timestamps: true, paranoid: true, charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' })
], IntegranteLegislatura);
//# sourceMappingURL=integrante-legislatura.entity.js.map