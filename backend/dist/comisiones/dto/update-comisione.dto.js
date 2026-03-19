"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateComisioneDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_comisione_dto_1 = require("./create-comisione.dto");
class UpdateComisioneDto extends (0, mapped_types_1.PartialType)(create_comisione_dto_1.CreateComisioneDto) {
}
exports.UpdateComisioneDto = UpdateComisioneDto;
//# sourceMappingURL=update-comisione.dto.js.map