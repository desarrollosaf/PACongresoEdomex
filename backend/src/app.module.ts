import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrabajoLegislativoModule } from './trabajo_legislativo/trabajo_legislativo.module';
import { ComisionesModule } from './comisiones/comisiones.module';
import { DiputadosModule } from './diputados/diputados.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '192.168.10.10',
      port: 3306,
      username: 'homestead',
      password: 'secret',
      database: 'congreso_bd',
      models: [],
      autoLoadModels: true, 
      synchronize: true,  
    }),
    TrabajoLegislativoModule,
    ComisionesModule,
    DiputadosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
