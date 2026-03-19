import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDiputadoDto } from './dto/create-diputado.dto';
import { UpdateDiputadoDto } from './dto/update-diputado.dto';
import { Legislatura } from '../database/entities/legislatura.entity';
import { IntegranteLegislatura } from '../database/entities/integrante-legislatura.entity';
import { Diputado } from '../database/entities/diputado.entity';
import { Partido } from '../database/entities/partido.entity';
import { Distrito } from '../database/entities/distrito.entity';
import { Foto } from '../database/entities/foto.entity';

@Injectable()
export class DiputadosService {
  constructor(
    @InjectModel(Legislatura)
    private legislaturaModel: typeof Legislatura,
    @InjectModel(Diputado)
    private diputadoModel: typeof Diputado,
  ) {}
  create(createDiputadoDto: CreateDiputadoDto) {
    return 'This action adds a new diputado';
  }

  async findAll() {
    return this.diputadoModel.findAll({
      include: [
        Foto,
        {
          model: IntegranteLegislatura,
          where: { fecha_fin: null },
        },
      ],
    });
  }

  async findIntegrantesByLegislatura(numero: string) {
    console.log('holi');
    return this.legislaturaModel.findOne({
      where: { numero },
      include: [
        {
          model: IntegranteLegislatura,
          where: { fecha_fin: null },
          include: [
            {
              model: Diputado,
              include: [Foto]
            },
            Partido,
            Distrito
          ],
        },
      ],
    });
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
