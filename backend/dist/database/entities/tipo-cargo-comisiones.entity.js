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
exports.TipoCargoComision = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const integrante_comisions_entity_1 = require("./integrante-comisions.entity");
let TipoCargoComision = class TipoCargoComision extends sequelize_typescript_1.Model {
    integrantes;
};
exports.TipoCargoComision = TipoCargoComision;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(36),
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4
    }),
    __metadata("design:type", String)
], TipoCargoComision.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false
    }),
    __metadata("design:type", String)
], TipoCargoComision.prototype, "valor", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], TipoCargoComision.prototype, "nivel", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true
    }),
    __metadata("design:type", Date)
], TipoCargoComision.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true
    }),
    __metadata("design:type", Date)
], TipoCargoComision.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => integrante_comisions_entity_1.IntegranteComision),
    __metadata("design:type", Array)
], TipoCargoComision.prototype, "integrantes", void 0);
exports.TipoCargoComision = TipoCargoComision = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'tipo_cargo_comisions',
        underscored: true,
        timestamps: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    })
], TipoCargoComision);
//# sourceMappingURL=tipo-cargo-comisiones.entity.js.map