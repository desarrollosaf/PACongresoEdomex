import { Injectable } from '@nestjs/common';
import { CreateBoletineDto } from './dto/create-boletine.dto';
import { UpdateBoletineDto } from './dto/update-boletine.dto';
import { Comunicados } from 'src/database/entities/comunicados.entity';
import { InjectModel } from '@nestjs/sequelize';
import { response } from 'express';
import { Foto } from 'src/database/entities/fotos.entity';
import { DescripcionComunicados } from 'src/database/entities/descripcioncomunicados.entity';

@Injectable()
export class BoletinesService {
  constructor(
    @InjectModel(Comunicados)
    private comunicadosModel: typeof Comunicados,
  ) {}

  create(createBoletineDto: CreateBoletineDto) {
    return 'This action adds a new boletine';
  }

  async findAll() {
    return await Comunicados.findAll({
      limit: 5,
      order: [['fecha', 'DESC']],
      include: [Foto,
        {
          model: DescripcionComunicados,
          as: 'descripcion', 
          order: [['orden', 'ASC']]
        }
      ]
    })
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
