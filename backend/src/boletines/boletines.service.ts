import { Injectable } from '@nestjs/common';
import { CreateBoletineDto } from './dto/create-boletine.dto';
import { UpdateBoletineDto } from './dto/update-boletine.dto';
import { Comunicados } from 'src/database/entities/comunicados.entity';
import { InjectModel } from '@nestjs/sequelize';
import { response } from 'express';
import { Foto } from 'src/database/entities/fotos.entity';
import { DescripcionComunicados } from 'src/database/entities/descripcioncomunicados.entity';
import { Op, literal } from 'sequelize';


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

  async findOne(id: string) {
    return await Comunicados.findByPk(id, {
      include: [Foto,
        {
          model: DescripcionComunicados,
          as: 'descripcion', 
          separate: true,
          order: [['orden', 'ASC']]
        }
      ]
    }
    );
  }

  update(id: number, updateBoletineDto: UpdateBoletineDto) {
    return `This action updates a #${id} boletine update`;
  }

  remove(id: number) {
    return `This action removes a #${id} boletine remove`;
  }

  async random(){
    const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() - 30);

  const ids = await Comunicados.findAll({
    attributes: ['id'],
    where: {
      fecha: {
        [Op.gte]: fechaLimite
      }
    },
    order: literal('RAND()'),
    limit: 4,
    raw: true
  });

  const idsArray = ids.map(i => i.id);

  return await Comunicados.findAll({
    where: {
      id: {
        [Op.in]: idsArray
      }
    },
    include: [
      Foto,
      {
        model: DescripcionComunicados,
        as: 'descripcion',
        separate: true,
        order: [['orden', 'ASC']]
      }
    ]
  });
  }
}
