import { Module } from '@nestjs/common';
import { BoletinesService } from './boletines.service';
import { BoletinesController } from './boletines.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comunicados } from 'src/database/entities/comunicados.entity';
import { Foto } from 'src/database/entities/fotos.entity';
import { DescripcionComunicados } from 'src/database/entities/descripcioncomunicados.entity';

@Module({
  controllers: [BoletinesController],
  providers: [BoletinesService],
  imports:[
     SequelizeModule.forFeature([Comunicados, Foto, DescripcionComunicados])
  ]
})
export class BoletinesModule {}
