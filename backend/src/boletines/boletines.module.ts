import { Module } from '@nestjs/common';
import { BoletinesService } from './boletines.service';
import { BoletinesController } from './boletines.controller';

@Module({
  controllers: [BoletinesController],
  providers: [BoletinesService],
})
export class BoletinesModule {}
