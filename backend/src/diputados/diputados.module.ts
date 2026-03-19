import { Module } from '@nestjs/common';
import { DiputadosService } from './diputados.service';
import { DiputadosController } from './diputados.controller';

@Module({
  controllers: [DiputadosController],
  providers: [DiputadosService],
})
export class DiputadosModule {}
