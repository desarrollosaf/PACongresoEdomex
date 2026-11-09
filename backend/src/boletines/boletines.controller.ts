import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
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


@Get('boletinesTodos')
  async boletinesTodos(@Query('pagina') pagina?: string) {
    const page = Math.max(Number(pagina) || 1, 1);
    return this.boletinesService.boletinesTodos(page);
}

@Get('boletinesAll/:pagina')
  async boletinesAll(@Param('pagina', ParseIntPipe) pagina: number){
    const page = Number(pagina) || 1;
    return this.boletinesService.boletinesAll(page);
  }

  @Get('random')
  random(){
    return this.boletinesService.random();
  }

   @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boletinesService.findOne(id);
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
