import { Injectable } from '@nestjs/common';
import { CreateComisioneDto } from './dto/create-comisione.dto';
import { UpdateComisioneDto } from './dto/update-comisione.dto';

@Injectable()
export class ComisionesService {
  create(createComisioneDto: CreateComisioneDto) {
    return 'This action adds a new comisione';
  }

  findAll() {
    return `This action returns all comisiones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comisione`;
  }

  update(id: number, updateComisioneDto: UpdateComisioneDto) {
    return `This action updates a #${id} comisione`;
  }

  remove(id: number) {
    return `This action removes a #${id} comisione`;
  }
}
