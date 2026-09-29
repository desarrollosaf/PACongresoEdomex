import { Controller, Get, Query } from '@nestjs/common';
import { SintesisInformativaService } from './sintesis-informativa.service';

@Controller('sintesis-informativa')
export class SintesisInformativaController {
  constructor(private readonly sintesisInformativaService: SintesisInformativaService) {}

  @Get()
  findAll(@Query('page') page?: string, @Query('fecha') fecha?: string) {
    const pagina = Number(page) || 1;
    return this.sintesisInformativaService.findAll(pagina, fecha);
  }
}
