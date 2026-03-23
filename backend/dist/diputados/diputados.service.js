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
exports.DiputadosService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const legislatura_entity_1 = require("../database/entities/legislatura.entity");
const integrante_legislatura_entity_1 = require("../database/entities/integrante-legislatura.entity");
const diputado_entity_1 = require("../database/entities/diputado.entity");
const partido_entity_1 = require("../database/entities/partido.entity");
const distrito_entity_1 = require("../database/entities/distrito.entity");
const fotos_entity_1 = require("../database/entities/fotos.entity");
const autores_comunicados_entity_1 = require("../database/entities/autores-comunicados.entity");
const comunicados_entity_1 = require("../database/entities/comunicados.entity");
const integrante_comisions_entity_1 = require("../database/entities/integrante-comisions.entity");
const comisiones_entity_1 = require("../database/entities/comisiones.entity");
const tipo_cargo_comisiones_entity_1 = require("../database/entities/tipo-cargo-comisiones.entity");
const fotos_entity_2 = require("../database/entities/fotos.entity");
let DiputadosService = class DiputadosService {
    legislaturaModel;
    diputadoModel;
    constructor(legislaturaModel, diputadoModel) {
        this.legislaturaModel = legislaturaModel;
        this.diputadoModel = diputadoModel;
    }
    create(createDiputadoDto) {
        return 'This action adds a new diputado';
    }
    async findAll() {
        return this.diputadoModel.findAll({
            order: [['apaterno', 'ASC']],
            include: [
                fotos_entity_1.Foto,
                {
                    model: integrante_legislatura_entity_1.IntegranteLegislatura,
                    where: { fecha_fin: null },
                    include: [partido_entity_1.Partido, distrito_entity_1.Distrito],
                },
            ],
        });
    }
    async findIntegrantesByLegislatura(numero) {
        return this.legislaturaModel.findOne({
            where: { numero },
            include: [
                {
                    model: integrante_legislatura_entity_1.IntegranteLegislatura,
                    where: { fecha_fin: null },
                    include: [
                        {
                            model: diputado_entity_1.Diputado,
                            include: [fotos_entity_1.Foto]
                        },
                        partido_entity_1.Partido,
                        distrito_entity_1.Distrito
                    ],
                },
            ],
        });
    }
    findOne(id) {
        return `This action returns a #${id} diputado`;
    }
    async getPerfil(id) {
        return this.diputadoModel.findOne({
            where: { id },
            include: [
                fotos_entity_1.Foto,
                {
                    model: integrante_legislatura_entity_1.IntegranteLegislatura,
                    where: { fecha_fin: null },
                    required: false,
                    include: [
                        partido_entity_1.Partido,
                        distrito_entity_1.Distrito,
                        {
                            model: integrante_comisions_entity_1.IntegranteComision,
                            include: [
                                comisiones_entity_1.Comision,
                                tipo_cargo_comisiones_entity_1.TipoCargoComision
                            ],
                        },
                        {
                            model: autores_comunicados_entity_1.AutoresComunicados,
                            required: false,
                            include: [
                                {
                                    model: comunicados_entity_1.Comunicados,
                                    order: [['fecha', 'DESC']],
                                    include: [{ model: fotos_entity_2.Foto, as: 'fotos' }]
                                }
                            ]
                        }
                    ],
                },
            ],
        });
    }
    update(id, updateDiputadoDto) {
        return `This action updates a #${id} diputado`;
    }
    remove(id) {
        return `This action removes a #${id} diputado`;
    }
};
exports.DiputadosService = DiputadosService;
exports.DiputadosService = DiputadosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(legislatura_entity_1.Legislatura)),
    __param(1, (0, sequelize_1.InjectModel)(diputado_entity_1.Diputado)),
    __metadata("design:paramtypes", [Object, Object])
], DiputadosService);
//# sourceMappingURL=diputados.service.js.map