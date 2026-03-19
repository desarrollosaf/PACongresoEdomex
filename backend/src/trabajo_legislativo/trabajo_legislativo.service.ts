import { Injectable } from '@nestjs/common';
import { CreateTrabajoLegislativoDto } from './dto/create-trabajo_legislativo.dto';
import { UpdateTrabajoLegislativoDto } from './dto/update-trabajo_legislativo.dto';
import { Gaceta } from '../database/entities/gaceta.entity';

@Injectable()
export class TrabajoLegislativoService {
  create(createTrabajoLegislativoDto: CreateTrabajoLegislativoDto) {
    return 'This action adds a new trabajoLegislativo';
  }

  async findAll() {
    const data = await Gaceta.findAll();
    console.log(JSON.stringify(data, null, 2));
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} trabajoLegislativo`;
  }

  update(id: number, updateTrabajoLegislativoDto: UpdateTrabajoLegislativoDto) {
    return `This action updates a #${id} trabajoLegislativo`;
  }

  remove(id: number) {
    return `This action removes a #${id} trabajoLegislativo`;
  }

}
