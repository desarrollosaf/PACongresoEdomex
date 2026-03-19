"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const legislatura_entity_1 = require("./entities/legislatura.entity");
const diputado_entity_1 = require("./entities/diputado.entity");
const partido_entity_1 = require("./entities/partido.entity");
const distrito_entity_1 = require("./entities/distrito.entity");
const integrante_legislatura_entity_1 = require("./entities/integrante-legislatura.entity");
const comunicados_entity_1 = require("./entities/comunicados.entity");
<<<<<<< HEAD
const fotos_entity_1 = require("./entities/fotos.entity");
const descripcioncomunicados_entity_1 = require("./entities/descripcioncomunicados.entity");
=======
const foto_entity_1 = require("./entities/foto.entity");
>>>>>>> 771b04e54800831ee62ff876318ffdae2ea1c126
const sequelizeFeatures = sequelize_1.SequelizeModule.forFeature([
    legislatura_entity_1.Legislatura,
    diputado_entity_1.Diputado,
    partido_entity_1.Partido,
    distrito_entity_1.Distrito,
    integrante_legislatura_entity_1.IntegranteLegislatura,
    comunicados_entity_1.Comunicados,
<<<<<<< HEAD
    fotos_entity_1.Foto,
    descripcioncomunicados_entity_1.DescripcionComunicados
=======
    foto_entity_1.Foto,
>>>>>>> 771b04e54800831ee62ff876318ffdae2ea1c126
]);
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [sequelizeFeatures],
        exports: [sequelizeFeatures],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map