import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ComisionesService } from './comisiones.service';
import { ComisionesController } from './comisiones.controller';
import { Comision } from '../database/entities/comisiones.entity';
import { TipoComision } from '../database/entities/tipo-comisiones.entity';

@Module({
  imports: [SequelizeModule.forFeature([Comision, TipoComision])],
  controllers: [ComisionesController],
  providers: [ComisionesService],
})
export class ComisionesModule {}