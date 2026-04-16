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
exports.EstadisticasService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const visita_pagina_entity_1 = require("../database/entities/visita-pagina.entity");
const encuesta_satisfaccion_entity_1 = require("../database/entities/encuesta-satisfaccion.entity");
const encuesta_satisfaccion_detallada_entity_1 = require("../database/entities/encuesta-satisfaccion-detallada.entity");
let EstadisticasService = class EstadisticasService {
    visitaModel;
    encuestaModel;
    encuestaDetalladaModel;
    constructor(visitaModel, encuestaModel, encuestaDetalladaModel) {
        this.visitaModel = visitaModel;
        this.encuestaModel = encuestaModel;
        this.encuestaDetalladaModel = encuestaDetalladaModel;
    }
    async registrarVisita(ruta, sumar = true) {
        if (!ruta)
            return { exito: false, visitas_totales: 0 };
        let visita = await this.visitaModel.findOne({ where: { ruta } });
        if (visita) {
            if (sumar) {
                visita.contador += 1;
                await visita.save();
            }
        }
        else {
            if (sumar) {
                visita = await this.visitaModel.create({ ruta, contador: 1 });
            }
            else {
                return {
                    exito: true,
                    ruta,
                    visitas_totales: 0
                };
            }
        }
        return {
            exito: true,
            ruta,
            visitas_totales: visita.contador
        };
    }
    async guardarEncuesta(ruta, calificacion, comentario) {
        if (!ruta || !calificacion)
            return { exito: false };
        const nueva = await this.encuestaModel.create({
            ruta,
            calificacion,
            comentario
        });
        return {
            exito: true,
            datos: nueva
        };
    }
    async guardarEncuestaDetallada(ruta, respuestas) {
        if (!respuestas || Object.keys(respuestas).length === 0)
            return { exito: false };
        const nueva = await this.encuestaDetalladaModel.create({
            ruta: ruta || '/',
            experiencia_general: respuestas.p1 || 0,
            facilidad_navegacion: respuestas.p2 || 0,
            claridad_informacion: respuestas.p3 || 0,
            diseno_presentacion: respuestas.p4 || 0,
            utilidad_contenido: respuestas.p5 || 0
        });
        return {
            exito: true,
            datos: nueva
        };
    }
};
exports.EstadisticasService = EstadisticasService;
exports.EstadisticasService = EstadisticasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(visita_pagina_entity_1.VisitaPagina)),
    __param(1, (0, sequelize_1.InjectModel)(encuesta_satisfaccion_entity_1.EncuestaSatisfaccion)),
    __param(2, (0, sequelize_1.InjectModel)(encuesta_satisfaccion_detallada_entity_1.EncuestaSatisfaccionDetallada)),
    __metadata("design:paramtypes", [Object, Object, Object])
], EstadisticasService);
//# sourceMappingURL=estadisticas.service.js.map