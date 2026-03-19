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
exports.Distrito = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const integrante_legislatura_entity_1 = require("./integrante-legislatura.entity");
let Distrito = class Distrito extends sequelize_typescript_1.Model {
    distrito;
    municipio_id;
    orden;
    integrantes;
};
exports.Distrito = Distrito;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], Distrito.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Distrito.prototype, "distrito", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Distrito.prototype, "municipio_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Distrito.prototype, "orden", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => integrante_legislatura_entity_1.IntegranteLegislatura),
    __metadata("design:type", Array)
], Distrito.prototype, "integrantes", void 0);
exports.Distrito = Distrito = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'distritos', underscored: true, timestamps: true })
], Distrito);
//# sourceMappingURL=distrito.entity.js.map