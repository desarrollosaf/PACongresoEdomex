"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDiputadoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_diputado_dto_1 = require("./create-diputado.dto");
class UpdateDiputadoDto extends (0, mapped_types_1.PartialType)(create_diputado_dto_1.CreateDiputadoDto) {
}
exports.UpdateDiputadoDto = UpdateDiputadoDto;
//# sourceMappingURL=update-diputado.dto.js.map