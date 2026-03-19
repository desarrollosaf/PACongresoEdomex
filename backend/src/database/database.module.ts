import { Module, Global } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// Entidades de la base de datos centralizada
import { Legislatura } from './entities/legislatura.entity';
import { Diputado } from './entities/diputado.entity';
import { Partido } from './entities/partido.entity';
import { Distrito } from './entities/distrito.entity';
import { IntegranteLegislatura } from './entities/integrante-legislatura.entity';
import { Comunicados } from './entities/comunicados.entity';

const sequelizeFeatures = SequelizeModule.forFeature([
  Legislatura,
  Diputado,
  Partido,
  Distrito,
  IntegranteLegislatura,
  Comunicados,
]);

@Global()
@Module({
  imports: [sequelizeFeatures],
  exports: [sequelizeFeatures],
})
export class DatabaseModule {}
