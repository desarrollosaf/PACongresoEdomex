import { SintesisInformativaService } from './sintesis-informativa.service';
export declare class SintesisInformativaController {
    private readonly sintesisInformativaService;
    constructor(sintesisInformativaService: SintesisInformativaService);
    findAll(page?: string, fecha?: string): Promise<{
        rows: import("../database/entities/sintesis-informativa.entity").SintesisInformativa[];
        count: number;
    }>;
}
