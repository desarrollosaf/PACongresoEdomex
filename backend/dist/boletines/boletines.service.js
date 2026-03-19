"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoletinesService = void 0;
const common_1 = require("@nestjs/common");
let BoletinesService = class BoletinesService {
    create(createBoletineDto) {
        return 'This action adds a new boletine';
    }
    findAll() {
        console.log('llega a get findall');
        return `This action returns all boletines`;
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
    (0, common_1.Injectable)()
], BoletinesService);
//# sourceMappingURL=boletines.service.js.map