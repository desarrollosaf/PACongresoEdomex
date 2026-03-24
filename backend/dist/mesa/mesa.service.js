"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MesaService = void 0;
const common_1 = require("@nestjs/common");
const comisiones_entity_1 = require("../database/entities/comisiones.entity");
const diputado_entity_1 = require("../database/entities/diputado.entity");
const fotos_entity_1 = require("../database/entities/fotos.entity");
const integrante_comisions_entity_1 = require("../database/entities/integrante-comisions.entity");
const integrante_legislatura_entity_1 = require("../database/entities/integrante-legislatura.entity");
const tipo_cargo_comision_entity_1 = require("../database/entities/tipo-cargo-comision.entity");
let MesaService = class MesaService {
    async findAll() {
        const comision = await comisiones_entity_1.Comision.findOne({
            where: {
                nombre: "DIP PERMANENTE DEL SEGUNDO ANO EJERCICIO CONSTITUCIONAL 03-DIC-2025 AL 31-ENE-26"
            }
        });
        return await integrante_comisions_entity_1.IntegranteComision.findAll({
            where: {
                comision_id: comision?.id
            },
            include: [
                {
                    model: tipo_cargo_comision_entity_1.TipoCargoComision,
                    as: "tipo_cargo",
                },
                {
                    model: integrante_legislatura_entity_1.IntegranteLegislatura,
                    as: "integranteLegis",
                    include: [
                        {
                            model: diputado_entity_1.Diputado,
                            as: "diputado",
                            include: [
                                {
                                    model: fotos_entity_1.Foto,
                                    as: "fotos"
                                }
                            ]
                        },
                    ]
                },
            ],
            order: [
                [
                    {
                        model: tipo_cargo_comision_entity_1.TipoCargoComision,
                        as: 'tipo_cargo'
                    },
                    'nivel', 'ASC'
                ]
            ]
        });
    }
};
exports.MesaService = MesaService;
exports.MesaService = MesaService = __decorate([
    (0, common_1.Injectable)()
], MesaService);
//# sourceMappingURL=mesa.service.js.map