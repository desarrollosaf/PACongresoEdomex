import { Controller, Get } from '@nestjs/common';
import { JuntaService } from './junta.service';

@Controller('junta')
export class JuntaController {
  constructor(private readonly juntaService: JuntaService) {}

  @Get()
    findAll() {
      return this.juntaService.findAll();
    }
}
