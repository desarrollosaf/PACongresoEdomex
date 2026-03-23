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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComisionesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const comisiones_entity_1 = require("../database/entities/comisiones.entity");
const tipo_comisiones_entity_1 = require("../database/entities/tipo-comisiones.entity");
const integrante_comisions_entity_1 = require("../database/entities/integrante-comisions.entity");
const integrante_legislatura_entity_1 = require("../database/entities/integrante-legislatura.entity");
const tipo_cargo_comisiones_entity_1 = require("../database/entities/tipo-cargo-comisiones.entity");
const diputado_entity_1 = require("../database/entities/diputado.entity");
let ComisionesService = class ComisionesService {
    comisionModel;
    create(createComisioneDto) {
        return 'This action adds a new comisione';
    }
    constructor(comisionModel) {
        this.comisionModel = comisionModel;
    }
    async findAll() {
        const comisiones = await this.comisionModel.findAll({
            attributes: ['id', 'nombre', 'alias', 'tipo_comision_id'],
            include: [
                {
                    model: tipo_comisiones_entity_1.TipoComision,
                    attributes: ['id', 'valor']
                },
                {
                    model: integrante_comisions_entity_1.IntegranteComision,
                    attributes: ['id'],
                    include: [
                        {
                            model: integrante_legislatura_entity_1.IntegranteLegislatura,
                            attributes: ['id'],
                            include: [
                                {
                                    model: diputado_entity_1.Diputado,
                                    attributes: [
                                        'id',
                                        'nombres',
                                        'apaterno',
                                        'amaterno'
                                    ]
                                }
                            ]
                        },
                        {
                            model: tipo_cargo_comisiones_entity_1.TipoCargoComision,
                            attributes: ['id', 'valor']
                        }
                    ]
                }
            ]
        });
        const agrupado = comisiones.reduce((acc, comision) => {
            const tipo = comision.tipo?.valor || 'Sin tipo';
            if (!acc[tipo]) {
                acc[tipo] = [];
            }
            acc[tipo].push(comision);
            return acc;
        }, {});
        return agrupado;
    }
    async findOne(id) {
        return this.comisionModel.findByPk(id);
    }
    update(id, updateComisioneDto) {
        return `This action updates a #${id} comisione`;
    }
    remove(id) {
        return `This action removes a #${id} comisione`;
    }
};
exports.ComisionesService = ComisionesService;
exports.ComisionesService = ComisionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(comisiones_entity_1.Comision)),
    __metadata("design:paramtypes", [Object])
], ComisionesService);
//# sourceMappingURL=comisiones.service.js.map