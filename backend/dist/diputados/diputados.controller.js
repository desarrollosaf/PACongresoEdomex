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
exports.DiputadosController = void 0;
const common_1 = require("@nestjs/common");
const diputados_service_1 = require("./diputados.service");
const create_diputado_dto_1 = require("./dto/create-diputado.dto");
const update_diputado_dto_1 = require("./dto/update-diputado.dto");
let DiputadosController = class DiputadosController {
    diputadosService;
    constructor(diputadosService) {
        this.diputadosService = diputadosService;
    }
    create(createDiputadoDto) {
        return this.diputadosService.create(createDiputadoDto);
    }
    findAll() {
        return this.diputadosService.findAll();
    }
    findAll2() {
        return this.diputadosService.findAll2();
    }
    findIntegrantesByLegislatura(numero) {
        return this.diputadosService.findIntegrantesByLegislatura(numero);
    }
    findOne(id) {
        return this.diputadosService.findOne(+id);
    }
    getPerfil(id) {
        return this.diputadosService.getPerfil(id);
    }
    getPerfil2(id) {
        return this.diputadosService.getPerfil2(id);
    }
    update(id, updateDiputadoDto) {
        return this.diputadosService.update(+id, updateDiputadoDto);
    }
    remove(id) {
        return this.diputadosService.remove(+id);
    }
};
exports.DiputadosController = DiputadosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_diputado_dto_1.CreateDiputadoDto]),
    __metadata("design:returntype", void 0)
], DiputadosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DiputadosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DiputadosController.prototype, "findAll2", null);
__decorate([
    (0, common_1.Get)('legislatura/:numero'),
    __param(0, (0, common_1.Param)('numero')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiputadosController.prototype, "findIntegrantesByLegislatura", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiputadosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/perfil'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiputadosController.prototype, "getPerfil", null);
__decorate([
    (0, common_1.Get)(':id/perfil2'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiputadosController.prototype, "getPerfil2", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_diputado_dto_1.UpdateDiputadoDto]),
    __metadata("design:returntype", void 0)
], DiputadosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiputadosController.prototype, "remove", null);
exports.DiputadosController = DiputadosController = __decorate([
    (0, common_1.Controller)('diputados'),
    __metadata("design:paramtypes", [diputados_service_1.DiputadosService])
], DiputadosController);
//# sourceMappingURL=diputados.controller.js.map