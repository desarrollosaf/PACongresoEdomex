import { CreateTrabajoLegislativoDto } from './dto/create-trabajo_legislativo.dto';
import { UpdateTrabajoLegislativoDto } from './dto/update-trabajo_legislativo.dto';
import { Gaceta } from '../database/entities/gaceta.entity';
export declare class TrabajoLegislativoService {
    create(createTrabajoLegislativoDto: CreateTrabajoLegislativoDto): string;
    findAll(): Promise<Gaceta[]>;
    findOne(id: number): string;
    update(id: number, updateTrabajoLegislativoDto: UpdateTrabajoLegislativoDto): string;
    remove(id: number): string;
}
