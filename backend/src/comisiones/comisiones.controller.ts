import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComisionesService } from './comisiones.service';
import { CreateComisioneDto } from './dto/create-comisione.dto';
import { UpdateComisioneDto } from './dto/update-comisione.dto';

@Controller('comisiones')
export class ComisionesController {
  constructor(private readonly comisionesService: ComisionesService) {}

  @Post()
  create(@Body() createComisioneDto: CreateComisioneDto) {
    return this.comisionesService.create(createComisioneDto);
  }

  @Get()
  findAll() {
    return this.comisionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comisionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComisioneDto: UpdateComisioneDto) {
    return this.comisionesService.update(+id, updateComisioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comisionesService.remove(+id);
  }
}
