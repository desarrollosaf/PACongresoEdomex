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

@Module({
  imports: [
    SequelizeModule.forFeature([
      Legislatura,
      Diputado,
      Partido,
      Distrito,
      IntegranteLegislatura,
      Foto,
    ]),
  ],
  controllers: [DiputadosController],
  providers: [DiputadosService],
})
export class DiputadosModule {}
