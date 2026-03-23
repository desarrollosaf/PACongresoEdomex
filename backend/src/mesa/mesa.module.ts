import { Module } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { MesaController } from './mesa.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { IntegranteComision } from 'src/database/entities/integrante-comisions.entity';
import { IntegranteLegislatura } from 'src/database/entities/integrante-legislatura.entity';
import { TipoCargoComision } from 'src/database/entities/tipo-cargo-comision.entity';

@Module({
  controllers: [MesaController],
  providers: [MesaService],
  imports:[
       SequelizeModule.forFeature([IntegranteComision, IntegranteLegislatura, TipoCargoComision]),
    ]
})
export class MesaModule {}
