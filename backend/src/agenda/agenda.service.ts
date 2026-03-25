import { Injectable } from '@nestjs/common';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { Agenda } from 'src/database/entities/agenda.entity';
import { Sede } from 'src/database/entities/sede.entity';

@Injectable()
export class AgendaService {
  create(createAgendaDto: CreateAgendaDto) {
    return 'This action adds a new agenda';
  }

  findAll() {
    const agendas = Agenda.findAll({
      order: [['fecha_hora', 'DESC']],
      include: [Sede],
    });
    return agendas;
  }

  findOne(id: number) {
    return `This action returns a #${id} agenda`;
  }

  update(id: number, updateAgendaDto: UpdateAgendaDto) {
    return `This action updates a #${id} agenda`;
  }

  remove(id: number) {
    return `This action removes a #${id} agenda`;
  }
}
