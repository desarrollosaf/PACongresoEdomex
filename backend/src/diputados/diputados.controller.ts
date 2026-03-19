import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiputadosService } from './diputados.service';
import { CreateDiputadoDto } from './dto/create-diputado.dto';
import { UpdateDiputadoDto } from './dto/update-diputado.dto';

@Controller('diputados')
export class DiputadosController {
  constructor(private readonly diputadosService: DiputadosService) {}

  @Post()
  create(@Body() createDiputadoDto: CreateDiputadoDto) {
    return this.diputadosService.create(createDiputadoDto);
  }

  @Get()
  findAll() {
    return this.diputadosService.findAll();
  }

  @Get('legislatura/:numero')
  findIntegrantesByLegislatura(@Param('numero') numero: string) {
    return this.diputadosService.findIntegrantesByLegislatura(numero);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diputadosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiputadoDto: UpdateDiputadoDto) {
    return this.diputadosService.update(+id, updateDiputadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diputadosService.remove(+id);
  }
}
