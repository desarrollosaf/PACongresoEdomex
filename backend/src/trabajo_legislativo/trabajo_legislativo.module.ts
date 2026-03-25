import { Module } from '@nestjs/common';
import { TrabajoLegislativoService } from './trabajo_legislativo.service';
import { TrabajoLegislativoController } from './trabajo_legislativo.controller';
import { DatabaseModule } from 'src/database/database.module';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';

@Module({
  imports: [
      SequelizeModule.forFeature([
        DatabaseModule
      ]),
    ],
  controllers: [TrabajoLegislativoController],
  providers: [TrabajoLegislativoService],
})
export class TrabajoLegislativoModule {}
