import { Module, Global } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// Entidades de la base de datos centralizada
import { Legislatura } from './entities/legislatura.entity';
import { Diputado } from './entities/diputado.entity';
import { Partido } from './entities/partido.entity';
import { Distrito } from './entities/distrito.entity';
import { IntegranteLegislatura } from './entities/integrante-legislatura.entity';

@Global()
@Module({
  imports: [
    SequelizeModule.forFeature([
      Legislatura,
      Diputado,
      Partido,
      Distrito,
      IntegranteLegislatura,
    ]),
  ],
  exports: [SequelizeModule], // Exportar los modelos para que cualquier módulo pueda utilizarlos
})
export class DatabaseModule {}
