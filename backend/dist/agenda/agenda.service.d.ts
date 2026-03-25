import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { Agenda } from 'src/database/entities/agenda.entity';
export declare class AgendaService {
    create(createAgendaDto: CreateAgendaDto): string;
    findAll(): Promise<Agenda[]>;
    findOne(id: number): string;
    update(id: number, updateAgendaDto: UpdateAgendaDto): string;
    remove(id: number): string;
}
