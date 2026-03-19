import { CreateBoletineDto } from './dto/create-boletine.dto';
import { UpdateBoletineDto } from './dto/update-boletine.dto';
export declare class BoletinesService {
    create(createBoletineDto: CreateBoletineDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBoletineDto: UpdateBoletineDto): string;
    remove(id: number): string;
}
