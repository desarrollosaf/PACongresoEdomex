import { JuntaService } from './junta.service';
export declare class JuntaController {
    private readonly juntaService;
    constructor(juntaService: JuntaService);
    findAll(): Promise<import("../database/entities/integrante-comisions.entity").IntegranteComision[]>;
}
