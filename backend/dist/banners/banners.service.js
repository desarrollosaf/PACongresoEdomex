"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannersService = void 0;
const common_1 = require("@nestjs/common");
const banners_entity_1 = require("../database/entities/banners.entity");
const fotos_entity_1 = require("../database/entities/fotos.entity");
let BannersService = class BannersService {
    async findAll() {
        return await banners_entity_1.Banners.findAll({
            include: {
                model: fotos_entity_1.Foto,
                as: "fotos"
            },
            order: [
                ['orden', 'ASC']
            ]
        });
    }
};
exports.BannersService = BannersService;
exports.BannersService = BannersService = __decorate([
    (0, common_1.Injectable)()
], BannersService);
//# sourceMappingURL=banners.service.js.map