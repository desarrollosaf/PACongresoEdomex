import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BoletinesModule } from './boletines/boletines.module';

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
    }),
    BoletinesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
