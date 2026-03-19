import { CreateTrabajoLegislativoDto } from './dto/create-trabajo_legislativo.dto';
import { UpdateTrabajoLegislativoDto } from './dto/update-trabajo_legislativo.dto';
export declare class TrabajoLegislativoService {
    create(createTrabajoLegislativoDto: CreateTrabajoLegislativoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTrabajoLegislativoDto: UpdateTrabajoLegislativoDto): string;
    remove(id: number): string;
}
