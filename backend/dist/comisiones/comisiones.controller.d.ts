import { ComisionesService } from './comisiones.service';
import { CreateComisioneDto } from './dto/create-comisione.dto';
import { UpdateComisioneDto } from './dto/update-comisione.dto';
export declare class ComisionesController {
    private readonly comisionesService;
    constructor(comisionesService: ComisionesService);
    create(createComisioneDto: CreateComisioneDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateComisioneDto: UpdateComisioneDto): string;
    remove(id: string): string;
}
