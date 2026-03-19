import { Injectable } from '@nestjs/common';
import { CreateTrabajoLegislativoDto } from './dto/create-trabajo_legislativo.dto';
import { UpdateTrabajoLegislativoDto } from './dto/update-trabajo_legislativo.dto';

@Injectable()
export class TrabajoLegislativoService {
  create(createTrabajoLegislativoDto: CreateTrabajoLegislativoDto) {
    return 'This action adds a new trabajoLegislativo';
  }

  findAll() {
    return `This action returns all trabajoLegislativo`;
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
