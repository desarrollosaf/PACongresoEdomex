import { Module, Global } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// Entidades de la base de datos centralizada
import { Legislatura } from './entities/legislatura.entity';
import { Diputado } from './entities/diputado.entity';
import { Partido } from './entities/partido.entity';
import { Distrito } from './entities/distrito.entity';
import { IntegranteLegislatura } from './entities/integrante-legislatura.entity';
import { Comunicados } from './entities/comunicados.entity';
import { Foto } from './entities/fotos.entity';
import { DescripcionComunicados } from './entities/descripcioncomunicados.entity';
import { Gaceta } from './entities/gaceta.entity';
import { IntegranteComision } from './entities/integrante-comisions.entity';
import { TipoCargoComision } from './entities/tipo-cargo-comision.entity';
import { Legislacion } from './entities/legislacion.entity';
import { Agenda } from './entities/agenda.entity';
import { Sede } from './entities/sede.entity';

const sequelizeFeatures = SequelizeModule.forFeature([
  Legislatura,
  Diputado,
  Partido,
  Distrito,
  IntegranteLegislatura,
  Comunicados,
  Foto,
  DescripcionComunicados,
  Gaceta,
  IntegranteComision,
  TipoCargoComision,
  Legislacion,
  Agenda,
  Sede
]);

@Global()
@Module({
  imports: [sequelizeFeatures],
  exports: [sequelizeFeatures],
})
export class DatabaseModule {}
