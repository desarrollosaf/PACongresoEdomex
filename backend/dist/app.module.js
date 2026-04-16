"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const sequelize_1 = require("@nestjs/sequelize");
const boletines_module_1 = require("./boletines/boletines.module");
const trabajo_legislativo_module_1 = require("./trabajo_legislativo/trabajo_legislativo.module");
const comisiones_module_1 = require("./comisiones/comisiones.module");
const diputados_module_1 = require("./diputados/diputados.module");
const mesa_module_1 = require("./mesa/mesa.module");
const junta_module_1 = require("./junta/junta.module");
const database_module_1 = require("./database/database.module");
const agenda_module_1 = require("./agenda/agenda.module");
const banners_module_1 = require("./banners/banners.module");
const estadisticas_module_1 = require("./estadisticas/estadisticas.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'congreso_bd',
                models: [],
                autoLoadModels: true,
                synchronize: true,
            }),
            boletines_module_1.BoletinesModule,
            trabajo_legislativo_module_1.TrabajoLegislativoModule,
            comisiones_module_1.ComisionesModule,
            diputados_module_1.DiputadosModule,
            mesa_module_1.MesaModule,
            junta_module_1.JuntaModule,
            database_module_1.DatabaseModule,
            agenda_module_1.AgendaModule,
            banners_module_1.BannersModule,
            estadisticas_module_1.EstadisticasModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map