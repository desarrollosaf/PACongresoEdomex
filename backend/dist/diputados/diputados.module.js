"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiputadosModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const diputados_service_1 = require("./diputados.service");
const diputados_controller_1 = require("./diputados.controller");
const legislatura_entity_1 = require("../database/entities/legislatura.entity");
const diputado_entity_1 = require("../database/entities/diputado.entity");
const partido_entity_1 = require("../database/entities/partido.entity");
const distrito_entity_1 = require("../database/entities/distrito.entity");
const integrante_legislatura_entity_1 = require("../database/entities/integrante-legislatura.entity");
let DiputadosModule = class DiputadosModule {
};
exports.DiputadosModule = DiputadosModule;
exports.DiputadosModule = DiputadosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([
                legislatura_entity_1.Legislatura,
                diputado_entity_1.Diputado,
                partido_entity_1.Partido,
                distrito_entity_1.Distrito,
                integrante_legislatura_entity_1.IntegranteLegislatura,
            ]),
        ],
        controllers: [diputados_controller_1.DiputadosController],
        providers: [diputados_service_1.DiputadosService],
    })
], DiputadosModule);
//# sourceMappingURL=diputados.module.js.map