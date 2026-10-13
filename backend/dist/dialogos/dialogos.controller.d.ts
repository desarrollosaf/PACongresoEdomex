import { DialogosService } from "./dialogos.service";
export declare class DialogosController {
    private readonly DialogoService;
    constructor(DialogoService: DialogosService);
    findAll(): Promise<import("../database/entities/dialogo.entity").Dialogo | null>;
}
