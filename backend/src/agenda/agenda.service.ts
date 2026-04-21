import { Injectable } from '@nestjs/common';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { Agenda } from 'src/database/entities/agenda.entity';
import { Sede } from 'src/database/entities/sede.entity';
import { Op } from 'sequelize';

@Injectable()
export class AgendaService {
  create(createAgendaDto: CreateAgendaDto) {
    return 'This action adds a new agenda';
  }

  async findAll() {
    const date = new Date();
    const agendas = await Agenda.findAll({
      where: {
        fecha_hora: {
          [Op.lt]: date,
        },
      },
      order: [['fecha_hora', 'DESC']],
      include: [Sede],
      limit: 5,
    });

    const transmision = await Agenda.findOne({
      where: {
        transmision: 1,
        fecha_hora: {
          [Op.lt]: date,
        },
      },
      order: [['fecha_hora', 'DESC']],
    });

    console.log("agendas");
    console.log(JSON.stringify(agendas, null, 2));

    return {
      agendas,
      transmision,
    };
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
