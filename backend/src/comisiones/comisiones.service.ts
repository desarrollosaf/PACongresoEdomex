import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateComisioneDto } from './dto/create-comisione.dto';
import { UpdateComisioneDto } from './dto/update-comisione.dto';
import { Comision } from '../database/entities/comisiones.entity';
import { TipoComision } from '../database/entities/tipo-comisiones.entity';

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
      include: [
        {
          model: TipoComision,
          attributes: ['id', 'valor']
        }
      ]
    });

    // 🔥 Agrupar por tipo
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
  async findOne(id: string): Promise<Comision | null> {
    return this.comisionModel.findByPk(id);
  }


  update(id: number, updateComisioneDto: UpdateComisioneDto) {
    return `This action updates a #${id} comisione`;
  }

  remove(id: number) {
    return `This action removes a #${id} comisione`;
  }
}
