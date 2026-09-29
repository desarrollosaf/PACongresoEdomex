import { SintesisInformativa } from 'src/database/entities/sintesis-informativa.entity';
export declare class SintesisInformativaService {
    findAll(pagina: number, fecha?: string): Promise<{
        rows: SintesisInformativa[];
        count: number;
    }>;
}
