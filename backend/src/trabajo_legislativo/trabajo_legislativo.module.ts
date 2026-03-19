import { Module } from '@nestjs/common';
import { TrabajoLegislativoService } from './trabajo_legislativo.service';
import { TrabajoLegislativoController } from './trabajo_legislativo.controller';

@Module({
  controllers: [TrabajoLegislativoController],
  providers: [TrabajoLegislativoService],
})
export class TrabajoLegislativoModule {}
