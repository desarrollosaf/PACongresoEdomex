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
exports.Legislatura = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const integrante_legislatura_entity_1 = require("./integrante-legislatura.entity");
let Legislatura = class Legislatura extends sequelize_typescript_1.Model {
    numero;
    fecha_inicio;
    fecha_fin;
    integrantes;
};
exports.Legislatura = Legislatura;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.CHAR(36), primaryKey: true, defaultValue: sequelize_typescript_1.DataType.UUIDV4 }),
    __metadata("design:type", String)
], Legislatura.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Legislatura.prototype, "numero", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY }),
    __metadata("design:type", Date)
], Legislatura.prototype, "fecha_inicio", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY }),
    __metadata("design:type", Date)
], Legislatura.prototype, "fecha_fin", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => integrante_legislatura_entity_1.IntegranteLegislatura),
    __metadata("design:type", Array)
], Legislatura.prototype, "integrantes", void 0);
exports.Legislatura = Legislatura = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'legislaturas', underscored: true, timestamps: true, paranoid: true, charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' })
], Legislatura);
//# sourceMappingURL=legislatura.entity.js.map