"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComisionesModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const comisiones_service_1 = require("./comisiones.service");
const comisiones_controller_1 = require("./comisiones.controller");
const comisiones_entity_1 = require("../database/entities/comisiones.entity");
const tipo_comisiones_entity_1 = require("../database/entities/tipo-comisiones.entity");
let ComisionesModule = class ComisionesModule {
};
exports.ComisionesModule = ComisionesModule;
exports.ComisionesModule = ComisionesModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([comisiones_entity_1.Comision, tipo_comisiones_entity_1.TipoComision])],
        controllers: [comisiones_controller_1.ComisionesController],
        providers: [comisiones_service_1.ComisionesService],
    })
], ComisionesModule);
//# sourceMappingURL=comisiones.module.js.map