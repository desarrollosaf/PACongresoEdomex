import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateComisioneDto } from './dto/create-comisione.dto';
import { UpdateComisioneDto } from './dto/update-comisione.dto';
import { Comision } from '../database/entities/comisiones.entity';
import { TipoComision } from '../database/entities/tipo-comisiones.entity';
import { IntegranteComision } from '../database/entities/integrante-comisions.entity';
import { IntegranteLegislatura } from '../database/entities/integrante-legislatura.entity';
import { TipoCargoComision } from '../database/entities/tipo-cargo-comisiones.entity';
import { Diputado } from '../database/entities/diputado.entity';
import { Partido } from '../database/entities/partido.entity';
import { Foto } from '../database/entities/fotos.entity';


@Injectable()
export class ComisionesService {
  create(createComisioneDto: CreateComisioneDto) {
    return 'This action adds a new comisione';
  }

  constructor(
    @InjectModel(Comision)
    private comisionModel: typeof Comision,
  ) { }

  async findAll() {
    const comisiones = await this.comisionModel.findAll({
      attributes: ['id', 'nombre', 'alias', 'tipo_comision_id'],
      where: {
        deleted_at: null
      },
      include: [
        {
          model: TipoComision,
          attributes: ['id', 'valor']
        },
        {
          model: IntegranteComision,
          attributes: ['id'],
          include: [
            {
              model: IntegranteLegislatura,
              attributes: ['id'],
              include: [
                {
                  model: Diputado, // 👈 depende cómo lo tengas definido
                  attributes: [
                    'id',
                    'nombres',
                    'apaterno',
                    'amaterno'
                  ]
                }
              ]
            },
            {
              model: TipoCargoComision,
              attributes: ['id', 'valor']
            }
          ]
        }
      ]
    });

    const agrupado = comisiones.reduce((acc: any, comision: any) => {
      const tipo = comision.tipo?.valor || 'Sin tipo';

      if (!acc[tipo]) {
        acc[tipo] = [];
      }

      acc[tipo].push(comision);

      return acc;
    }, {});

    return agrupado;
  }

  // 🔹 Obtener una por ID
  async findOne(id: string) {
    const comision = await this.comisionModel.findOne({
      where: {
        id,
        deleted_at: null,
      },
      attributes: ['id', 'nombre', 'alias', 'tipo_comision_id'],
      include: [
        {
          model: TipoComision,
          attributes: ['id', 'valor'],
        },
        {
          model: IntegranteComision,
          attributes: ['id'],
          include: [
            {
              model: IntegranteLegislatura,
              attributes: ['id'],
              include: [
                {
                  model: Diputado,
                  attributes: ['id', 'nombres', 'apaterno', 'amaterno'],
                  include:[
                    {
                      model: Foto,
                      attributes: ['id', 'path'],
                    }
                  ],
                },
                {
                model: Partido,
                attributes: ['id', 'nombre', 'siglas'],
              },
              ],
            },
            {
              model: TipoCargoComision,
              attributes: ['id', 'valor'],
            },
          ],
        },
      ],
    });

    return comision;
  }


  update(id: number, updateComisioneDto: UpdateComisioneDto) {
    return `This action updates a #${id} comisione`;
  }

  remove(id: number) {
    return `This action removes a #${id} comisione`;
  }
}
