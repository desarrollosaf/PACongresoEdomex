import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDiputadoDto } from './dto/create-diputado.dto';
import { UpdateDiputadoDto } from './dto/update-diputado.dto';
import { Legislatura } from '../database/entities/legislatura.entity';
import { IntegranteLegislatura } from '../database/entities/integrante-legislatura.entity';
import { Diputado } from '../database/entities/diputado.entity';
import { Partido } from '../database/entities/partido.entity';
import { Distrito } from '../database/entities/distrito.entity';
import { Foto } from '../database/entities/fotos.entity';
import { AutoresComunicados } from '../database/entities/autores-comunicados.entity';
import { Comunicados } from '../database/entities/comunicados.entity';
import { IntegranteComision } from '../database/entities/integrante-comisions.entity';
import { Comision } from '../database/entities/comisiones.entity';
import { TipoCargoComision } from '../database/entities/tipo-cargo-comisiones.entity';
import { Foto as FotosComunicado } from '../database/entities/fotos.entity';

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
      order: [['apaterno', 'ASC']],
      include: [
        Foto,
        {
          model: IntegranteLegislatura,
          where: { fecha_fin: null },
          include: [Partido, Distrito],
        },
      ],
    });
  }

  async findIntegrantesByLegislatura(numero: string) {
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

  async getPerfil(id: string) {
    return this.diputadoModel.findOne({
      where: { id },
      include: [
        Foto,
        {
          model: IntegranteLegislatura,
          where: { fecha_fin: null },
          required: false,
          include: [
            Partido,
            Distrito,
            {
              model: IntegranteComision,
              include: [
                Comision,
                TipoCargoComision
              ],
            },
            {
              model: AutoresComunicados,
              required: false,
              include: [
                {
                  model: Comunicados,
                  order: [['fecha', 'DESC']],
                  include: [{ model: FotosComunicado, as: 'fotos' }]
                }
              ]
            }
          ],
        },
      ],
    });
  }

  update(id: number, updateDiputadoDto: UpdateDiputadoDto) {
    return `This action updates a #${id} diputado`;
  }

  remove(id: number) {
    return `This action removes a #${id} diputado`;
  }
}
