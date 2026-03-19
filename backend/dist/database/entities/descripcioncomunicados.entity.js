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
exports.DescripcionComunicados = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let DescripcionComunicados = class DescripcionComunicados extends sequelize_typescript_1.Model {
};
exports.DescripcionComunicados = DescripcionComunicados;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, primaryKey: true, defaultValue: sequelize_typescript_1.DataType.UUIDV4 }),
    __metadata("design:type", String)
], DescripcionComunicados.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], DescripcionComunicados.prototype, "bullets", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], DescripcionComunicados.prototype, "comunicado_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.NUMBER }),
    __metadata("design:type", Number)
], DescripcionComunicados.prototype, "orden", void 0);
exports.DescripcionComunicados = DescripcionComunicados = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'descripcione_comunicados', underscored: true, timestamps: true, paranoid: true })
], DescripcionComunicados);
//# sourceMappingURL=descripcioncomunicados.entity.js.map