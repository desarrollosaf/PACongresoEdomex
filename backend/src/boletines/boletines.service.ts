import { Injectable } from '@nestjs/common';
import { CreateBoletineDto } from './dto/create-boletine.dto';
import { UpdateBoletineDto } from './dto/update-boletine.dto';
import { Comunicados } from 'src/database/entities/comunicados.entity';
import { InjectModel } from '@nestjs/sequelize';
import { response } from 'express';
import { Foto } from 'src/database/entities/fotos.entity';
import { DescripcionComunicados } from 'src/database/entities/descripcioncomunicados.entity';
import { Op, literal } from 'sequelize';
import { Legislatura } from 'src/database/entities/legislatura.entity';


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
    const legis = await Legislatura.findOne({ where: { numero: 'LXII' } });

    const comunicados2 = await Comunicados.findAll({
      limit: 9,
      where: {
        legislatura_id: legis?.id || null,
        publicado: 0
      },
      order: [[literal('CAST(comunicado AS UNSIGNED)'), 'DESC']],
      include: [
        {
          model: Foto,
          as: "fotos",
          separate: true,
          order: [['path', 'ASC']]
        },
        {
          model: DescripcionComunicados,
          as: 'descripcion', 
          separate: true,
          order: [['orden', 'ASC']]
        }
      ]
    });

    const comunicadosd = await Comunicados.findAll({
      limit: 9,
      where: {
        publicado: 0
      },
      order: [[literal('CAST(comunicado AS UNSIGNED)'), 'DESC']],
      include: [
        {
          model: Foto,
          as: "fotos",
          separate: true,
          order: [['path', 'ASC']]
        },
        {
          model: DescripcionComunicados,
          as: 'descripcion', 
          separate: true,
          order: [['orden', 'ASC']]
        }
      ]
    });

    const map = new Map();
    const merged = [];
    
    for (const c of comunicados2) {
      if (!map.has(c.id)) {
        map.set(c.id, true);
        merged.push(c);
      }
    }
    
    for (const c of comunicadosd) {
      if (!map.has(c.id)) {
        map.set(c.id, true);
        merged.push(c);
      }
    }

    return merged.slice(0, 9);
  }

  // Galería: comunicados con al menos una foto, 20 por página.
  // Solo id, fecha, título y fotos (sin texto) para que la respuesta sea ligera.
  async boletinesTodos(pagina = 1, limite = 20) {
    const legis = await Legislatura.findOne({ where: { numero: 'LXII' } });
    const legisId = legis?.id || '';

    return await Comunicados.findAndCountAll({
      attributes: ['id', 'fecha', 'titulo', 'comunicado'],
      where: {
        publicado: 0,
        [Op.and]: [
          literal(`EXISTS (SELECT 1 FROM fotos f WHERE f.fotoable_id = \`Comunicados\`.\`id\` AND f.fotoable_type LIKE '%Comunicado' AND f.deleted_at IS NULL)`),
        ],
      },
      offset: (pagina - 1) * limite,
      limit: limite,
      distinct: true,
      order: [
        [literal(`legislatura_id = '${legisId}'`), 'DESC'],
        [literal('CAST(comunicado AS UNSIGNED)'), 'DESC'],
      ],
      include: [
        {
          model: Foto,
          as: 'fotos',
          attributes: ['id', 'path', 'fotoable_id'],
          separate: true,
          order: [['path', 'ASC']],
        },
      ],
    });
  }

  async findOne(id: string) {
    return await Comunicados.findByPk(id, {
      include: [
        {
          model: Foto,
          as: "fotos",
          separate: true,
          order: [['path', 'ASC']]
        },
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
      {
        model: Foto,
        as:"fotos",
        separate: true,
        order: [['path', 'ASC']]
      },
      {
        model: DescripcionComunicados,
        as: 'descripcion',
        separate: true,
        order: [['orden', 'ASC']]
      }
    ]
  });
  }

  async boletinesAll(pagina: number){
    const legis = await Legislatura.findOne({ where: { numero: 'LXII' } });
    const legisId = legis?.id || '';

    return await Comunicados.findAndCountAll({
      where: {
        publicado: 0
      },
      offset: (pagina - 1) * 12,
      limit: 12,
      order: [
        [literal(`legislatura_id = '${legisId}'`), 'DESC'],
        [literal('CAST(comunicado AS UNSIGNED)'), 'DESC']
      ],
      include: [
        {
          model: Foto,
          as: "fotos",
          separate: true,
          order: [['path', 'ASC']]
        },
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
