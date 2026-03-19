import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiputadosModule } from './diputados/diputados.module';
import { TrabajoLegislativoModule } from './trabajo_legislativo/trabajo_legislativo.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '192.168.10.10',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      models: [],
      autoLoadModels: true, 
      synchronize: true,  
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
