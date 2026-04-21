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
exports.Comunicados = void 0;
const autores_comunicados_entity_1 = require("./autores-comunicados.entity");
const descripcioncomunicados_entity_1 = require("./descripcioncomunicados.entity");
const sequelize_typescript_1 = require("sequelize-typescript");
const fotos_entity_1 = require("./fotos.entity");
let Comunicados = class Comunicados extends sequelize_typescript_1.Model {
    fotos;
    descripcion;
    autores;
};
exports.Comunicados = Comunicados;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, primaryKey: true, defaultValue: sequelize_typescript_1.DataType.UUIDV4 }),
    __metadata("design:type", String)
], Comunicados.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Date)
], Comunicados.prototype, "fecha", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Comunicados.prototype, "comunicado", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Comunicados.prototype, "titulo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT }),
    __metadata("design:type", String)
], Comunicados.prototype, "texto", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Comunicados.prototype, "publicado", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Comunicados.prototype, "legislatura_id", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => fotos_entity_1.Foto, {
        foreignKey: 'fotoable_id',
        scope: {
            fotoable_type: 'App\\Models\\Comunicado',
        }
    }),
    __metadata("design:type", Array)
], Comunicados.prototype, "fotos", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => descripcioncomunicados_entity_1.DescripcionComunicados, {
        foreignKey: 'comunicado_id',
    }),
    __metadata("design:type", Array)
], Comunicados.prototype, "descripcion", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => autores_comunicados_entity_1.AutoresComunicados, {
        foreignKey: 'comunicado_id',
    }),
    __metadata("design:type", Array)
], Comunicados.prototype, "autores", void 0);
exports.Comunicados = Comunicados = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'comunicados', underscored: true, timestamps: true, paranoid: true })
], Comunicados);
//# sourceMappingURL=comunicados.entity.js.map