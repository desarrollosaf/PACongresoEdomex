import { Module } from '@nestjs/common';
import { SintesisInformativaService } from './sintesis-informativa.service';
import { SintesisInformativaController } from './sintesis-informativa.controller';

@Module({
  controllers: [SintesisInformativaController],
  providers: [SintesisInformativaService],
})
export class SintesisInformativaModule {}
