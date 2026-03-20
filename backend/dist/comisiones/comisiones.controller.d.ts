import { ComisionesService } from './comisiones.service';
import { CreateComisioneDto } from './dto/create-comisione.dto';
import { UpdateComisioneDto } from './dto/update-comisione.dto';
export declare class ComisionesController {
    private readonly comisionesService;
    constructor(comisionesService: ComisionesService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<import("../database/entities/comisiones.entity").Comision | null>;
    create(createComisioneDto: CreateComisioneDto): string;
    update(id: string, updateComisioneDto: UpdateComisioneDto): string;
    remove(id: string): string;
}
