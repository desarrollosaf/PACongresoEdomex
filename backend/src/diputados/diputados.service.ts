import { Injectable } from '@nestjs/common';
import { CreateDiputadoDto } from './dto/create-diputado.dto';
import { UpdateDiputadoDto } from './dto/update-diputado.dto';

@Injectable()
export class DiputadosService {
  create(createDiputadoDto: CreateDiputadoDto) {
    return 'This action adds a new diputado';
  }

  findAll() {
    return `This action returns all diputados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diputado`;
  }

  update(id: number, updateDiputadoDto: UpdateDiputadoDto) {
    return `This action updates a #${id} diputado`;
  }

  remove(id: number) {
    return `This action removes a #${id} diputado`;
  }
}
