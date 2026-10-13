"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogoModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const dialogos_controller_1 = require("./dialogos.controller");
const dialogos_service_1 = require("./dialogos.service");
let DialogoModule = class DialogoModule {
};
exports.DialogoModule = DialogoModule;
exports.DialogoModule = DialogoModule = __decorate([
    (0, common_1.Module)({
        controllers: [dialogos_controller_1.DialogosController],
        providers: [dialogos_service_1.DialogosService],
        imports: [sequelize_1.SequelizeModule.forFeature()],
    })
], DialogoModule);
//# sourceMappingURL=dialogos.module.js.map