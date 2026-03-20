import { CreateComisioneDto } from './dto/create-comisione.dto';
import { UpdateComisioneDto } from './dto/update-comisione.dto';
import { Comision } from '../database/entities/comisiones.entity';
export declare class ComisionesService {
    private comisionModel;
    create(createComisioneDto: CreateComisioneDto): string;
    constructor(comisionModel: typeof Comision);
    findAll(): Promise<any>;
    findOne(id: string): Promise<Comision | null>;
    update(id: number, updateComisioneDto: UpdateComisioneDto): string;
    remove(id: number): string;
}
