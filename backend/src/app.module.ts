import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiputadosModule } from './diputados/diputados.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'congreso',
      models: [],
      autoLoadModels: true, 
      synchronize: true,  
    }),
    DiputadosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
