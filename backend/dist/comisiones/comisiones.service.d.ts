import { CreateComisioneDto } from './dto/create-comisione.dto';
import { UpdateComisioneDto } from './dto/update-comisione.dto';
export declare class ComisionesService {
    create(createComisioneDto: CreateComisioneDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateComisioneDto: UpdateComisioneDto): string;
    remove(id: number): string;
}
