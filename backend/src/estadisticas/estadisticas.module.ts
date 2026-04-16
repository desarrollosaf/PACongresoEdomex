import { Module } from '@nestjs/common';
import { EstadisticasController } from './estadisticas.controller';
import { EstadisticasService } from './estadisticas.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { VisitaPagina } from '../database/entities/visita-pagina.entity';
import { EncuestaSatisfaccion } from '../database/entities/encuesta-satisfaccion.entity';
import { EncuestaSatisfaccionDetallada } from '../database/entities/encuesta-satisfaccion-detallada.entity';

@Module({
  imports: [SequelizeModule.forFeature([VisitaPagina, EncuestaSatisfaccion, EncuestaSatisfaccionDetallada])],
  controllers: [EstadisticasController],
  providers: [EstadisticasService]
})
export class EstadisticasModule {}
