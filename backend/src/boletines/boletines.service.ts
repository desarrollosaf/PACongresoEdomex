import { Injectable } from '@nestjs/common';
import { CreateBoletineDto } from './dto/create-boletine.dto';
import { UpdateBoletineDto } from './dto/update-boletine.dto';

@Injectable()
export class BoletinesService {
  create(createBoletineDto: CreateBoletineDto) {
    return 'This action adds a new boletine';
  }

  findAll() {
    console.log('llega a get findall')
    // const boletines = await 
    return `This action returns all boletines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boletine`;
  }

  update(id: number, updateBoletineDto: UpdateBoletineDto) {
    return `This action updates a #${id} boletine`;
  }

  remove(id: number) {
    return `This action removes a #${id} boletine`;
  }
}
