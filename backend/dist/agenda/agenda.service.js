"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendaService = void 0;
const common_1 = require("@nestjs/common");
const agenda_entity_1 = require("../database/entities/agenda.entity");
const sede_entity_1 = require("../database/entities/sede.entity");
let AgendaService = class AgendaService {
    create(createAgendaDto) {
        return 'This action adds a new agenda';
    }
    async findAll() {
        const agendas = await agenda_entity_1.Agenda.findAll({
            order: [['fecha_hora', 'DESC']],
            include: [sede_entity_1.Sede],
            limit: 5,
        });
        console.log("agendas");
        console.log(JSON.stringify(agendas, null, 2));
        return agendas;
    }
    findOne(id) {
        return `This action returns a #${id} agenda`;
    }
    update(id, updateAgendaDto) {
        return `This action updates a #${id} agenda`;
    }
    remove(id) {
        return `This action removes a #${id} agenda`;
    }
};
exports.AgendaService = AgendaService;
exports.AgendaService = AgendaService = __decorate([
    (0, common_1.Injectable)()
], AgendaService);
//# sourceMappingURL=agenda.service.js.map