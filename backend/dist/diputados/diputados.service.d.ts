import { CreateDiputadoDto } from './dto/create-diputado.dto';
import { UpdateDiputadoDto } from './dto/update-diputado.dto';
import { Legislatura } from '../database/entities/legislatura.entity';
export declare class DiputadosService {
    private legislaturaModel;
    constructor(legislaturaModel: typeof Legislatura);
    create(createDiputadoDto: CreateDiputadoDto): string;
    findAll(): string;
    findIntegrantesByLegislatura(numero: string): Promise<Legislatura | null>;
    findOne(id: number): string;
    update(id: number, updateDiputadoDto: UpdateDiputadoDto): string;
    remove(id: number): string;
}
