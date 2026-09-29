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
import { BannersModule } from './banners/banners.module';
import { EstadisticasModule } from './estadisticas/estadisticas.module';
import { MonitoreoModule } from './monitoreo/monitoreo.module';
import { SintesisInformativaModule } from './sintesis-informativa/sintesis-informativa.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'congreso_bd',
      models: [],
      autoLoadModels: true, 
      synchronize: true,  
      pool: {
        max: 14,  
        min: 3,
        idle: 10000,
        acquire: 30000,
      }
    }),
    BoletinesModule,
    TrabajoLegislativoModule,
    ComisionesModule,
    DiputadosModule,
    DatabaseModule,
    MesaModule,
    JuntaModule,
    DatabaseModule,
    AgendaModule,
    BannersModule,
    EstadisticasModule,
    MonitoreoModule,
    SintesisInformativaModule
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
