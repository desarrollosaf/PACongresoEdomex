import { Controller, Get, Query } from '@nestjs/common';
import { MonitoreoService } from './monitoreo.service';

@Controller('monitoreo')
export class MonitoreoController {
  constructor(private readonly monitoreoService: MonitoreoService) {}

  @Get()
  findAll(@Query('page') page: string = '1') {
    return this.monitoreoService.findAll(parseInt(page, 10));
  }
}
