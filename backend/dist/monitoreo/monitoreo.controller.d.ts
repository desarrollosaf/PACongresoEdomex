import { MonitoreoService } from './monitoreo.service';
export declare class MonitoreoController {
    private readonly monitoreoService;
    constructor(monitoreoService: MonitoreoService);
    findAll(page?: string): Promise<{
        data: import("../database/entities/monitoreo.entity").Monitoreo[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
}
