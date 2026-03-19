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
exports.TrabajoLegislativoController = void 0;
const common_1 = require("@nestjs/common");
const trabajo_legislativo_service_1 = require("./trabajo_legislativo.service");
const create_trabajo_legislativo_dto_1 = require("./dto/create-trabajo_legislativo.dto");
const update_trabajo_legislativo_dto_1 = require("./dto/update-trabajo_legislativo.dto");
let TrabajoLegislativoController = class TrabajoLegislativoController {
    trabajoLegislativoService;
    constructor(trabajoLegislativoService) {
        this.trabajoLegislativoService = trabajoLegislativoService;
    }
    create(createTrabajoLegislativoDto) {
        return this.trabajoLegislativoService.create(createTrabajoLegislativoDto);
    }
    findAll() {
        return this.trabajoLegislativoService.findAll();
    }
    findOne(id) {
        return this.trabajoLegislativoService.findOne(+id);
    }
    update(id, updateTrabajoLegislativoDto) {
        return this.trabajoLegislativoService.update(+id, updateTrabajoLegislativoDto);
    }
    remove(id) {
        return this.trabajoLegislativoService.remove(+id);
    }
};
exports.TrabajoLegislativoController = TrabajoLegislativoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_trabajo_legislativo_dto_1.CreateTrabajoLegislativoDto]),
    __metadata("design:returntype", void 0)
], TrabajoLegislativoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrabajoLegislativoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrabajoLegislativoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_trabajo_legislativo_dto_1.UpdateTrabajoLegislativoDto]),
    __metadata("design:returntype", void 0)
], TrabajoLegislativoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrabajoLegislativoController.prototype, "remove", null);
exports.TrabajoLegislativoController = TrabajoLegislativoController = __decorate([
    (0, common_1.Controller)('trabajo-legislativo'),
    __metadata("design:paramtypes", [trabajo_legislativo_service_1.TrabajoLegislativoService])
], TrabajoLegislativoController);
//# sourceMappingURL=trabajo_legislativo.controller.js.map