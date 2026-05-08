import { Module } from '@nestjs/common';
import { MonitoreoService } from './monitoreo.service';
import { MonitoreoController } from './monitoreo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Monitoreo } from 'src/database/entities/monitoreo.entity';

@Module({
  controllers: [MonitoreoController],
  providers: [MonitoreoService],
  imports: [
    SequelizeModule.forFeature([Monitoreo]),
  ],
})
export class MonitoreoModule {}
