import { TrabajoLegislativoService } from './trabajo_legislativo.service';
import { CreateTrabajoLegislativoDto } from './dto/create-trabajo_legislativo.dto';
import { UpdateTrabajoLegislativoDto } from './dto/update-trabajo_legislativo.dto';
export declare class TrabajoLegislativoController {
    private readonly trabajoLegislativoService;
    constructor(trabajoLegislativoService: TrabajoLegislativoService);
    create(createTrabajoLegislativoDto: CreateTrabajoLegislativoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTrabajoLegislativoDto: UpdateTrabajoLegislativoDto): string;
    remove(id: string): string;
}
