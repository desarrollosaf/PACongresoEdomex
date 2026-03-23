import { CreateTrabajoLegislativoDto } from './dto/create-trabajo_legislativo.dto';
import { UpdateTrabajoLegislativoDto } from './dto/update-trabajo_legislativo.dto';
import { Gaceta } from '../database/entities/gaceta.entity';
import { Legislacion } from '../database/entities/legislacion.entity';
export declare class TrabajoLegislativoService {
    create(createTrabajoLegislativoDto: CreateTrabajoLegislativoDto): string;
    findAll(): Promise<{
        gaceta: Gaceta[];
        legislacion: Legislacion[];
    }>;
    findOne(id: number): string;
    update(id: number, updateTrabajoLegislativoDto: UpdateTrabajoLegislativoDto): string;
    remove(id: number): string;
}
