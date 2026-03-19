"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoletinesModule = void 0;
const common_1 = require("@nestjs/common");
const boletines_service_1 = require("./boletines.service");
const boletines_controller_1 = require("./boletines.controller");
const sequelize_1 = require("@nestjs/sequelize");
const comunicados_entity_1 = require("../database/entities/comunicados.entity");
const fotos_entity_1 = require("../database/entities/fotos.entity");
const descripcioncomunicados_entity_1 = require("../database/entities/descripcioncomunicados.entity");
let BoletinesModule = class BoletinesModule {
};
exports.BoletinesModule = BoletinesModule;
exports.BoletinesModule = BoletinesModule = __decorate([
    (0, common_1.Module)({
        controllers: [boletines_controller_1.BoletinesController],
        providers: [boletines_service_1.BoletinesService],
        imports: [
            sequelize_1.SequelizeModule.forFeature([comunicados_entity_1.Comunicados, fotos_entity_1.Foto, descripcioncomunicados_entity_1.DescripcionComunicados])
        ]
    })
], BoletinesModule);
//# sourceMappingURL=boletines.module.js.map