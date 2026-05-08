import { Monitoreo } from 'src/database/entities/monitoreo.entity';
export declare class MonitoreoService {
    private monitoreoModel;
    constructor(monitoreoModel: typeof Monitoreo);
    findAll(page?: number): Promise<{
        data: Monitoreo[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
}
