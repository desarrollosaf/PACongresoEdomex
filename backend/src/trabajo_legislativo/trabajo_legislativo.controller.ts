import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrabajoLegislativoService } from './trabajo_legislativo.service';
import { CreateTrabajoLegislativoDto } from './dto/create-trabajo_legislativo.dto';
import { UpdateTrabajoLegislativoDto } from './dto/update-trabajo_legislativo.dto';

@Controller('trabajo-legislativo')
export class TrabajoLegislativoController {
  constructor(private readonly trabajoLegislativoService: TrabajoLegislativoService) {}

  @Post()
  create(@Body() createTrabajoLegislativoDto: CreateTrabajoLegislativoDto) {
    return this.trabajoLegislativoService.create(createTrabajoLegislativoDto);
  }

  @Get()
  findAll() {
    return this.trabajoLegislativoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trabajoLegislativoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrabajoLegislativoDto: UpdateTrabajoLegislativoDto) {
    return this.trabajoLegislativoService.update(+id, updateTrabajoLegislativoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trabajoLegislativoService.remove(+id);
  }

  
}
