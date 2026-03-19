import { CreateBoletineDto } from './dto/create-boletine.dto';
import { UpdateBoletineDto } from './dto/update-boletine.dto';
import { Comunicados } from 'src/database/entities/comunicados.entity';
export declare class BoletinesService {
    private comunicadosModel;
    constructor(comunicadosModel: typeof Comunicados);
    create(createBoletineDto: CreateBoletineDto): string;
    findAll(): Promise<Comunicados[]>;
    findOne(id: number): string;
    update(id: number, updateBoletineDto: UpdateBoletineDto): string;
    remove(id: number): string;
}
