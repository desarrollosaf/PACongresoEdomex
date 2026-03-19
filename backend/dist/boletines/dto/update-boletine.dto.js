"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBoletineDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_boletine_dto_1 = require("./create-boletine.dto");
class UpdateBoletineDto extends (0, mapped_types_1.PartialType)(create_boletine_dto_1.CreateBoletineDto) {
}
exports.UpdateBoletineDto = UpdateBoletineDto;
//# sourceMappingURL=update-boletine.dto.js.map