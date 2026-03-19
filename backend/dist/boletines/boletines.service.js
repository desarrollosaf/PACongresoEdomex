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
let BoletinesService = class BoletinesService {
    comunicadosModel;
    constructor(comunicadosModel) {
        this.comunicadosModel = comunicadosModel;
    }
    create(createBoletineDto) {
        return 'This action adds a new boletine';
    }
    async findAll() {
        return await comunicados_entity_1.Comunicados.findAll({
            limit: 5,
            order: [['fecha', 'DESC']],
            include: [fotos_entity_1.Foto,
                {
                    model: descripcioncomunicados_entity_1.DescripcionComunicados,
                    as: 'descripcion',
                    order: [['orden', 'ASC']]
                }
            ]
        });
    }
    findOne(id) {
        return `This action returns a #${id} boletine`;
    }
    update(id, updateBoletineDto) {
        return `This action updates a #${id} boletine`;
    }
    remove(id) {
        return `This action removes a #${id} boletine`;
    }
};
exports.BoletinesService = BoletinesService;
exports.BoletinesService = BoletinesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(comunicados_entity_1.Comunicados)),
    __metadata("design:paramtypes", [Object])
], BoletinesService);
//# sourceMappingURL=boletines.service.js.map