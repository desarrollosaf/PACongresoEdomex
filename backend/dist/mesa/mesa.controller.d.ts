import { MesaService } from './mesa.service';
export declare class MesaController {
    private readonly mesaService;
    constructor(mesaService: MesaService);
    findAll(): Promise<import("../database/entities/integrante-comisions.entity").IntegranteComision[]>;
}
