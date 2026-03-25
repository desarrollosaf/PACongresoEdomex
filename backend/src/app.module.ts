import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BoletinesModule } from './boletines/boletines.module';
import { TrabajoLegislativoModule } from './trabajo_legislativo/trabajo_legislativo.module';
import { ComisionesModule } from './comisiones/comisiones.module';
import { DiputadosModule } from './diputados/diputados.module';
import { DatabaseModule } from './database/database.module';
import { MesaModule } from './mesa/mesa.module';
import { JuntaModule } from './junta/junta.module';
import { AgendaModule } from './agenda/agenda.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '192.168.36.58',
      port: 3306,
      username: 'usr_congreso',
      password: 'NAp1gMx3QB5rzwLJjGGx',
      database: 'adminplem_congresoedomex',
      models: [],
      autoLoadModels: true, 
      synchronize: true,  
    }),
    BoletinesModule,
    TrabajoLegislativoModule,
    ComisionesModule,
    DiputadosModule,
    DatabaseModule,
    MesaModule,
    JuntaModule,
    DatabaseModule,
    AgendaModule
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
