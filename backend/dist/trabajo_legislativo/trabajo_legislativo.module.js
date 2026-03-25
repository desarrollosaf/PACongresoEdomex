"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrabajoLegislativoModule = void 0;
const common_1 = require("@nestjs/common");
const trabajo_legislativo_service_1 = require("./trabajo_legislativo.service");
const trabajo_legislativo_controller_1 = require("./trabajo_legislativo.controller");
const sequelize_module_1 = require("@nestjs/sequelize/dist/sequelize.module");
let TrabajoLegislativoModule = class TrabajoLegislativoModule {
};
exports.TrabajoLegislativoModule = TrabajoLegislativoModule;
exports.TrabajoLegislativoModule = TrabajoLegislativoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_module_1.SequelizeModule.forFeature([]),
        ],
        controllers: [trabajo_legislativo_controller_1.TrabajoLegislativoController],
        providers: [trabajo_legislativo_service_1.TrabajoLegislativoService],
    })
], TrabajoLegislativoModule);
//# sourceMappingURL=trabajo_legislativo.module.js.map