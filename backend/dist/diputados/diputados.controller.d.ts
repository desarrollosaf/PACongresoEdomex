import { DiputadosService } from './diputados.service';
import { CreateDiputadoDto } from './dto/create-diputado.dto';
import { UpdateDiputadoDto } from './dto/update-diputado.dto';
export declare class DiputadosController {
    private readonly diputadosService;
    constructor(diputadosService: DiputadosService);
    create(createDiputadoDto: CreateDiputadoDto): string;
    findAll(): Promise<import("../database/entities/diputado.entity").Diputado[]>;
    findAll2(): Promise<import("../database/entities/diputado.entity").Diputado[]>;
    findIntegrantesByLegislatura(numero: string): Promise<import("../database/entities/legislatura.entity").Legislatura | null>;
    findOne(id: string): string;
    getPerfil(id: string): Promise<import("../database/entities/diputado.entity").Diputado | null>;
    getPerfil2(id: string): Promise<any>;
    update(id: string, updateDiputadoDto: UpdateDiputadoDto): string;
    remove(id: string): string;
}
