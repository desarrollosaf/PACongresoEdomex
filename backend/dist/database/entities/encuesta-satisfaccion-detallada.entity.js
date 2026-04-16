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
exports.EncuestaSatisfaccionDetallada = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let EncuestaSatisfaccionDetallada = class EncuestaSatisfaccionDetallada extends sequelize_typescript_1.Model {
};
exports.EncuestaSatisfaccionDetallada = EncuestaSatisfaccionDetallada;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }),
    __metadata("design:type", Number)
], EncuestaSatisfaccionDetallada.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: true
    }),
    __metadata("design:type", String)
], EncuestaSatisfaccionDetallada.prototype, "ruta", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], EncuestaSatisfaccionDetallada.prototype, "experiencia_general", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], EncuestaSatisfaccionDetallada.prototype, "facilidad_navegacion", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], EncuestaSatisfaccionDetallada.prototype, "claridad_informacion", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], EncuestaSatisfaccionDetallada.prototype, "diseno_presentacion", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], EncuestaSatisfaccionDetallada.prototype, "utilidad_contenido", void 0);
exports.EncuestaSatisfaccionDetallada = EncuestaSatisfaccionDetallada = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'encuestas_satisfaccion_detallada',
        timestamps: true,
        createdAt: 'fecha_creacion',
        updatedAt: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    })
], EncuestaSatisfaccionDetallada);
//# sourceMappingURL=encuesta-satisfaccion-detallada.entity.js.map