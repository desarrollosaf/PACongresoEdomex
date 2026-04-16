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
exports.EstadisticasController = void 0;
const common_1 = require("@nestjs/common");
const estadisticas_service_1 = require("./estadisticas.service");
let EstadisticasController = class EstadisticasController {
    estadisticasService;
    constructor(estadisticasService) {
        this.estadisticasService = estadisticasService;
    }
    async registrarVisita(ruta, sumar) {
        return this.estadisticasService.registrarVisita(ruta, sumar !== false);
    }
    async guardarEncuesta(ruta, calificacion, comentario) {
        return this.estadisticasService.guardarEncuesta(ruta, calificacion, comentario);
    }
    async guardarEncuestaDetallada(ruta, respuestas) {
        return this.estadisticasService.guardarEncuestaDetallada(ruta, respuestas);
    }
};
exports.EstadisticasController = EstadisticasController;
__decorate([
    (0, common_1.Post)('visita'),
    __param(0, (0, common_1.Body)('ruta')),
    __param(1, (0, common_1.Body)('sumar')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], EstadisticasController.prototype, "registrarVisita", null);
__decorate([
    (0, common_1.Post)('encuesta'),
    __param(0, (0, common_1.Body)('ruta')),
    __param(1, (0, common_1.Body)('calificacion')),
    __param(2, (0, common_1.Body)('comentario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], EstadisticasController.prototype, "guardarEncuesta", null);
__decorate([
    (0, common_1.Post)('encuesta-detallada'),
    __param(0, (0, common_1.Body)('ruta')),
    __param(1, (0, common_1.Body)('respuestas')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EstadisticasController.prototype, "guardarEncuestaDetallada", null);
exports.EstadisticasController = EstadisticasController = __decorate([
    (0, common_1.Controller)('estadisticas'),
    __metadata("design:paramtypes", [estadisticas_service_1.EstadisticasService])
], EstadisticasController);
//# sourceMappingURL=estadisticas.controller.js.map