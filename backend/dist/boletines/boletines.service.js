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
exports.BoletinesService = void 0;
const common_1 = require("@nestjs/common");
const comunicados_entity_1 = require("../database/entities/comunicados.entity");
const sequelize_1 = require("@nestjs/sequelize");
const fotos_entity_1 = require("../database/entities/fotos.entity");
const descripcioncomunicados_entity_1 = require("../database/entities/descripcioncomunicados.entity");
const sequelize_2 = require("sequelize");
const legislatura_entity_1 = require("../database/entities/legislatura.entity");
let BoletinesService = class BoletinesService {
    comunicadosModel;
    constructor(comunicadosModel) {
        this.comunicadosModel = comunicadosModel;
    }
    create(createBoletineDto) {
        return 'This action adds a new boletine';
    }
    async findAll() {
        const legis = await legislatura_entity_1.Legislatura.findOne({ where: { numero: 'LXII' } });
        const comunicados2 = await comunicados_entity_1.Comunicados.findAll({
            limit: 9,
            where: {
                legislatura_id: legis?.id || null,
                publicado: 0
            },
            order: [[(0, sequelize_2.literal)('CAST(comunicado AS UNSIGNED)'), 'DESC']],
            include: [
                {
                    model: fotos_entity_1.Foto,
                    as: "fotos",
                    separate: true,
                    order: [['path', 'ASC']]
                },
                {
                    model: descripcioncomunicados_entity_1.DescripcionComunicados,
                    as: 'descripcion',
                    separate: true,
                    order: [['orden', 'ASC']]
                }
            ]
        });
        const comunicadosd = await comunicados_entity_1.Comunicados.findAll({
            limit: 9,
            where: {
                publicado: 0
            },
            order: [[(0, sequelize_2.literal)('CAST(comunicado AS UNSIGNED)'), 'DESC']],
            include: [
                {
                    model: fotos_entity_1.Foto,
                    as: "fotos",
                    separate: true,
                    order: [['path', 'ASC']]
                },
                {
                    model: descripcioncomunicados_entity_1.DescripcionComunicados,
                    as: 'descripcion',
                    separate: true,
                    order: [['orden', 'ASC']]
                }
            ]
        });
        const map = new Map();
        const merged = [];
        for (const c of comunicados2) {
            if (!map.has(c.id)) {
                map.set(c.id, true);
                merged.push(c);
            }
        }
        for (const c of comunicadosd) {
            if (!map.has(c.id)) {
                map.set(c.id, true);
                merged.push(c);
            }
        }
        return merged.slice(0, 9);
    }
    async findOne(id) {
        return await comunicados_entity_1.Comunicados.findByPk(id, {
            include: [
                {
                    model: fotos_entity_1.Foto,
                    as: "fotos",
                    separate: true,
                    order: [['path', 'ASC']]
                },
                {
                    model: descripcioncomunicados_entity_1.DescripcionComunicados,
                    as: 'descripcion',
                    separate: true,
                    order: [['orden', 'ASC']]
                }
            ]
        });
    }
    update(id, updateBoletineDto) {
        return `This action updates a #${id} boletine update`;
    }
    remove(id) {
        return `This action removes a #${id} boletine remove`;
    }
    async random() {
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - 30);
        const ids = await comunicados_entity_1.Comunicados.findAll({
            attributes: ['id'],
            where: {
                fecha: {
                    [sequelize_2.Op.gte]: fechaLimite
                }
            },
            order: (0, sequelize_2.literal)('RAND()'),
            limit: 4,
            raw: true
        });
        const idsArray = ids.map(i => i.id);
        return await comunicados_entity_1.Comunicados.findAll({
            where: {
                id: {
                    [sequelize_2.Op.in]: idsArray
                }
            },
            include: [
                {
                    model: fotos_entity_1.Foto,
                    as: "fotos",
                    separate: true,
                    order: [['path', 'ASC']]
                },
                {
                    model: descripcioncomunicados_entity_1.DescripcionComunicados,
                    as: 'descripcion',
                    separate: true,
                    order: [['orden', 'ASC']]
                }
            ]
        });
    }
    async boletinesAll(pagina) {
        return await comunicados_entity_1.Comunicados.findAndCountAll({
            offset: (pagina - 1) * 12,
            limit: 12,
            order: [['fecha', 'DESC']],
            include: [
                {
                    model: fotos_entity_1.Foto,
                    as: "fotos",
                    separate: true,
                    order: [['path', 'ASC']]
                },
                {
                    model: descripcioncomunicados_entity_1.DescripcionComunicados,
                    as: 'descripcion',
                    separate: true,
                    order: [['orden', 'ASC']]
                }
            ]
        });
    }
};
exports.BoletinesService = BoletinesService;
exports.BoletinesService = BoletinesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(comunicados_entity_1.Comunicados)),
    __metadata("design:paramtypes", [Object])
], BoletinesService);
//# sourceMappingURL=boletines.service.js.map