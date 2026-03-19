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
exports.Partido = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const integrante_legislatura_entity_1 = require("./integrante-legislatura.entity");
let Partido = class Partido extends sequelize_typescript_1.Model {
    siglas;
    nombre;
    emblema;
    rgb;
    rgb2;
    integrantes;
};
exports.Partido = Partido;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], Partido.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Partido.prototype, "siglas", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Partido.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT }),
    __metadata("design:type", String)
], Partido.prototype, "emblema", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Partido.prototype, "rgb", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Partido.prototype, "rgb2", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => integrante_legislatura_entity_1.IntegranteLegislatura),
    __metadata("design:type", Array)
], Partido.prototype, "integrantes", void 0);
exports.Partido = Partido = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'partidos', underscored: true, timestamps: true, paranoid: true })
], Partido);
//# sourceMappingURL=partido.entity.js.map