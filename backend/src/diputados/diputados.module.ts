import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiputadosService } from './diputados.service';
import { DiputadosController } from './diputados.controller';
import { Legislatura } from '../database/entities/legislatura.entity';
import { Diputado } from '../database/entities/diputado.entity';
import { Partido } from '../database/entities/partido.entity';
import { Distrito } from '../database/entities/distrito.entity';
import { IntegranteLegislatura } from '../database/entities/integrante-legislatura.entity';
import { Foto } from '../database/entities/foto.entity';
import { Gaceta } from 'src/database/entities/gaceta.entity';
import { TipoCargoComision } from '../database/entities/tipo-cargo-comisiones.entity';
import { IntegranteComision } from '../database/entities/integrante-comisions.entity';
import { AutoresComunicados } from '../database/entities/autores-comunicados.entity';
import { Comunicados } from '../database/entities/comunicados.entity';
import { Comision } from '../database/entities/comisiones.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Legislatura,
      Diputado,
      Partido,
      Distrito,
      IntegranteLegislatura,
      Foto,
      Gaceta,
      TipoCargoComision,
      IntegranteComision,
      AutoresComunicados,
      Comunicados,
      Comision
    ]),
  ],
  controllers: [DiputadosController],
  providers: [DiputadosService],
})
export class DiputadosModule {}
