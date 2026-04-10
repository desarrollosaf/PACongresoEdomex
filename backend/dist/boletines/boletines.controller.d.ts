import { BoletinesService } from './boletines.service';
import { CreateBoletineDto } from './dto/create-boletine.dto';
import { UpdateBoletineDto } from './dto/update-boletine.dto';
export declare class BoletinesController {
    private readonly boletinesService;
    constructor(boletinesService: BoletinesService);
    create(createBoletineDto: CreateBoletineDto): string;
    findAll(): Promise<import("../database/entities/comunicados.entity").Comunicados[]>;
    boletinesAll(pagina: number): Promise<{
        rows: import("../database/entities/comunicados.entity").Comunicados[];
        count: number;
    }>;
    random(): Promise<import("../database/entities/comunicados.entity").Comunicados[]>;
    findOne(id: string): Promise<import("../database/entities/comunicados.entity").Comunicados | null>;
    update(id: string, updateBoletineDto: UpdateBoletineDto): string;
    remove(id: string): string;
}
