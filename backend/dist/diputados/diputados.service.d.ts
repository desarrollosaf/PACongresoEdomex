import { CreateDiputadoDto } from './dto/create-diputado.dto';
import { UpdateDiputadoDto } from './dto/update-diputado.dto';
export declare class DiputadosService {
    create(createDiputadoDto: CreateDiputadoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDiputadoDto: UpdateDiputadoDto): string;
    remove(id: number): string;
}
