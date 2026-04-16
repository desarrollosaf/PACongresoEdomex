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
import { Gender } from '../database/entities/gender.entity';
import { Sequelize } from 'sequelize';

@Injectable()
export class DiputadosService {
  constructor(
    @InjectModel(Legislatura)
    private legislaturaModel: typeof Legislatura,
    @InjectModel(Diputado)
    private diputadoModel: typeof Diputado,
  ) { }
  create(createDiputadoDto: CreateDiputadoDto) {
    return 'This action adds a new diputado';
  }

  async findAll() {
    return this.diputadoModel.findAll({
      order: [['apaterno', 'ASC']],
      include: [
        Foto,
        Gender,
        {
          model: IntegranteLegislatura,
          where: { fecha_fin: null },
          include: [Partido, Distrito],
        },
      ],
    });
  }

  async findAll2() {
    return this.diputadoModel.findAll({
      limit: 20,
      order: Sequelize.literal('RAND()'), // 👈 random
      include: [
        Foto,
        Gender,
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
    // Obtenemos al diputado y su relación directa primero (con sus comisiones)
    return this.diputadoModel.findOne({
      where: { id },
      include: [
        Foto,
        Gender,
        {
          model: IntegranteLegislatura,
          where: { fecha_fin: null },
          required: false,
          include: [
            Partido,
            Distrito,
            {
              model: IntegranteComision,
              separate: true, // <-- Optimización: evita producto cartesiano
              include: [
                Comision,
                TipoCargoComision
              ],
            },
            {
              model: AutoresComunicados,
              required: false,
              separate: true, // <-- Optimización: evita producto cartesiano masivo
              include: [
                {
                  model: Comunicados,
                  // Nota: Sequelize puede que ignore el order en el include si se usa separate. 
                  // Podríamos reordenar en memoria si esto importa, pero Sequelize usualmente lo maneja bien.
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


  async getPerfil2(id: string) {

    const perfil = await this.diputadoModel.findOne({
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
              model: AutoresComunicados,
              required: false,
              separate: true, // <-- Optimización clave para evitar tiempos muertos
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

    const perfilJson = perfil?.toJSON();

    if (perfilJson?.integrantes) {
      perfilJson.integrantes.forEach((leg: any) => {
        if (leg.autores_comunicados) {
          leg.autores_comunicados = leg.autores_comunicados
            .sort((a: any, b: any) => {
              const fechaA = new Date(a.comunicado?.fecha || 0).getTime();
              const fechaB = new Date(b.comunicado?.fecha || 0).getTime();
              return fechaB - fechaA;
            })
            .slice(0, 2);
        }
      });
    }

    return perfilJson;



  }


  update(id: number, updateDiputadoDto: UpdateDiputadoDto) {
    return `This action updates a #${id} diputado`;
  }

  remove(id: number) {
    return `This action removes a #${id} diputado`;
  }
}
