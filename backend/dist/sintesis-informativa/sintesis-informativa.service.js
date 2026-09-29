"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SintesisInformativaService = void 0;
const common_1 = require("@nestjs/common");
const sintesis_informativa_entity_1 = require("../database/entities/sintesis-informativa.entity");
let SintesisInformativaService = class SintesisInformativaService {
    async findAll(pagina, fecha) {
        const limit = 10;
        return await sintesis_informativa_entity_1.SintesisInformativa.findAndCountAll({
            where: fecha ? { fecha } : undefined,
            offset: (pagina - 1) * limit,
            limit,
            order: [['fecha', 'DESC']],
        });
    }
};
exports.SintesisInformativaService = SintesisInformativaService;
exports.SintesisInformativaService = SintesisInformativaService = __decorate([
    (0, common_1.Injectable)()
], SintesisInformativaService);
//# sourceMappingURL=sintesis-informativa.service.js.map