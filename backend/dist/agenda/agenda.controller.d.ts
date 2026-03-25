import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
export declare class AgendaController {
    private readonly agendaService;
    constructor(agendaService: AgendaService);
    create(createAgendaDto: CreateAgendaDto): string;
    findAll(): Promise<import("../database/entities/agenda.entity").Agenda[]>;
    findOne(id: string): string;
    update(id: string, updateAgendaDto: UpdateAgendaDto): string;
    remove(id: string): string;
}
