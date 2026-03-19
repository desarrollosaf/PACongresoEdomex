import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoletinesService } from './boletines.service';
import { CreateBoletineDto } from './dto/create-boletine.dto';
import { UpdateBoletineDto } from './dto/update-boletine.dto';

@Controller('boletines')
export class BoletinesController {
  constructor(private readonly boletinesService: BoletinesService) {}

  @Post()
  create(@Body() createBoletineDto: CreateBoletineDto) {
    return this.boletinesService.create(createBoletineDto);
  }

@Get()
  findAll() {
    return this.boletinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boletinesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoletineDto: UpdateBoletineDto) {
    return this.boletinesService.update(+id, updateBoletineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boletinesService.remove(+id);
  }
}
