"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrabajoLegislativoService = void 0;
const common_1 = require("@nestjs/common");
const gaceta_entity_1 = require("../database/entities/gaceta.entity");
const legislacion_entity_1 = require("../database/entities/legislacion.entity");
let TrabajoLegislativoService = class TrabajoLegislativoService {
    create(createTrabajoLegislativoDto) {
        return 'This action adds a new trabajoLegislativo';
    }
    async findAll() {
        const legislacion = await legislacion_entity_1.Legislacion.findAll();
        const data = await gaceta_entity_1.Gaceta.findAll({
            order: [['date', 'DESC']]
        });
        console.log(JSON.stringify(data, null, 2));
        return {
            gaceta: data,
            legislacion: legislacion
        };
    }
    findOne(id) {
        return `This action returns a #${id} trabajoLegislativo`;
    }
    update(id, updateTrabajoLegislativoDto) {
        return `This action updates a #${id} trabajoLegislativo`;
    }
    remove(id) {
        return `This action removes a #${id} trabajoLegislativo`;
    }
};
exports.TrabajoLegislativoService = TrabajoLegislativoService;
exports.TrabajoLegislativoService = TrabajoLegislativoService = __decorate([
    (0, common_1.Injectable)()
], TrabajoLegislativoService);
//# sourceMappingURL=trabajo_legislativo.service.js.map