import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('diputados')
  getDiputados() {
    return [
      {
        id: 'emma-laura',
        name: 'Emma Laura Álvarez',
        party: 'PAN',
        position: 'Diputada | Distrito Plurinominal',
        image: '/images/2PAN-Emma-Laura-Álvarez-Villavicencio-01.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.'
      }
    ];
  }
}
