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
exports.Gender = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const diputado_entity_1 = require("./diputado.entity");
let Gender = class Gender extends sequelize_typescript_1.Model {
    genero;
    diputados;
};
exports.Gender = Gender;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.CHAR(36), primaryKey: true, defaultValue: sequelize_typescript_1.DataType.UUIDV4 }),
    __metadata("design:type", String)
], Gender.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Gender.prototype, "genero", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => diputado_entity_1.Diputado, { foreignKey: 'gender_id' }),
    __metadata("design:type", Array)
], Gender.prototype, "diputados", void 0);
exports.Gender = Gender = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'genders', underscored: true, timestamps: true, paranoid: false, charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' })
], Gender);
//# sourceMappingURL=gender.entity.js.map