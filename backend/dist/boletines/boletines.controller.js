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
exports.BoletinesController = void 0;
const common_1 = require("@nestjs/common");
const boletines_service_1 = require("./boletines.service");
const create_boletine_dto_1 = require("./dto/create-boletine.dto");
const update_boletine_dto_1 = require("./dto/update-boletine.dto");
let BoletinesController = class BoletinesController {
    boletinesService;
    constructor(boletinesService) {
        this.boletinesService = boletinesService;
    }
    create(createBoletineDto) {
        return this.boletinesService.create(createBoletineDto);
    }
    findAll() {
        return this.boletinesService.findAll();
    }
    findOne(id) {
        return this.boletinesService.findOne(+id);
    }
    update(id, updateBoletineDto) {
        return this.boletinesService.update(+id, updateBoletineDto);
    }
    remove(id) {
        return this.boletinesService.remove(+id);
    }
};
exports.BoletinesController = BoletinesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_boletine_dto_1.CreateBoletineDto]),
    __metadata("design:returntype", void 0)
], BoletinesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BoletinesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoletinesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_boletine_dto_1.UpdateBoletineDto]),
    __metadata("design:returntype", void 0)
], BoletinesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoletinesController.prototype, "remove", null);
exports.BoletinesController = BoletinesController = __decorate([
    (0, common_1.Controller)('api/boletines'),
    __metadata("design:paramtypes", [boletines_service_1.BoletinesService])
], BoletinesController);
//# sourceMappingURL=boletines.controller.js.map