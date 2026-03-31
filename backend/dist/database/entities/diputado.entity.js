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
exports.Diputado = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const integrante_legislatura_entity_1 = require("./integrante-legislatura.entity");
const fotos_entity_1 = require("./fotos.entity");
const autores_comunicados_entity_1 = require("./autores-comunicados.entity");
const gender_entity_1 = require("./gender.entity");
let Diputado = class Diputado extends sequelize_typescript_1.Model {
    apaterno;
    amaterno;
    nombres;
    descripcion;
    shortname;
    fancyurl;
    gender_id;
    genero;
    email;
    ext;
    facebook;
    twitter;
    instagram;
    ubicacion;
    telefono;
    integrantes;
    fotos;
    autores_comunicados;
};
exports.Diputado = Diputado;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.CHAR(36), primaryKey: true, defaultValue: sequelize_typescript_1.DataType.UUIDV4 }),
    __metadata("design:type", String)
], Diputado.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Diputado.prototype, "apaterno", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Diputado.prototype, "amaterno", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Diputado.prototype, "nombres", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT }),
    __metadata("design:type", String)
], Diputado.prototype, "descripcion", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Diputado.prototype, "shortname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Diputado.prototype, "fancyurl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.CHAR(36) }),
    __metadata("design:type", String)
], Diputado.prototype, "gender_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => gender_entity_1.Gender, 'gender_id'),
    __metadata("design:type", gender_entity_1.Gender)
], Diputado.prototype, "genero", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Diputado.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Diputado.prototype, "ext", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Diputado.prototype, "facebook", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Diputado.prototype, "twitter", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Diputado.prototype, "instagram", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Diputado.prototype, "ubicacion", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Diputado.prototype, "telefono", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => integrante_legislatura_entity_1.IntegranteLegislatura),
    __metadata("design:type", Array)
], Diputado.prototype, "integrantes", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => fotos_entity_1.Foto, { foreignKey: 'fotoable_id', constraints: false }),
    __metadata("design:type", Array)
], Diputado.prototype, "fotos", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => autores_comunicados_entity_1.AutoresComunicados, { foreignKey: 'autor_id', constraints: false }),
    __metadata("design:type", Array)
], Diputado.prototype, "autores_comunicados", void 0);
exports.Diputado = Diputado = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'diputados', underscored: true, timestamps: true, paranoid: true, charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' })
], Diputado);
//# sourceMappingURL=diputado.entity.js.map