import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DialogosController } from './dialogos.controller';
import { DialogosService } from './dialogos.service';

@Module({
  controllers: [DialogosController],
  providers: [DialogosService],
  imports: [SequelizeModule.forFeature()],
})
export class DialogoModule {}
