import { CreateDiputadoDto } from './dto/create-diputado.dto';
import { UpdateDiputadoDto } from './dto/update-diputado.dto';
import { Legislatura } from '../database/entities/legislatura.entity';
import { Diputado } from '../database/entities/diputado.entity';
export declare class DiputadosService {
    private legislaturaModel;
    private diputadoModel;
    constructor(legislaturaModel: typeof Legislatura, diputadoModel: typeof Diputado);
    create(createDiputadoDto: CreateDiputadoDto): string;
    findAll(): Promise<Diputado[]>;
    findIntegrantesByLegislatura(numero: string): Promise<Legislatura | null>;
    findOne(id: number): string;
    update(id: number, updateDiputadoDto: UpdateDiputadoDto): string;
    remove(id: number): string;
}
