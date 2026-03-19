import { DiputadosService } from './diputados.service';
import { CreateDiputadoDto } from './dto/create-diputado.dto';
import { UpdateDiputadoDto } from './dto/update-diputado.dto';
export declare class DiputadosController {
    private readonly diputadosService;
    constructor(diputadosService: DiputadosService);
    create(createDiputadoDto: CreateDiputadoDto): string;
    findAll(): string;
    findIntegrantesByLegislatura(numero: string): Promise<import("../database/entities/legislatura.entity").Legislatura | null>;
    findOne(id: string): string;
    update(id: string, updateDiputadoDto: UpdateDiputadoDto): string;
    remove(id: string): string;
}
