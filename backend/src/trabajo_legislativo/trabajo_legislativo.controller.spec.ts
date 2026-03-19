import { Test, TestingModule } from '@nestjs/testing';
import { TrabajoLegislativoController } from './trabajo_legislativo.controller';
import { TrabajoLegislativoService } from './trabajo_legislativo.service';

describe('TrabajoLegislativoController', () => {
  let controller: TrabajoLegislativoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrabajoLegislativoController],
      providers: [TrabajoLegislativoService],
    }).compile();

    controller = module.get<TrabajoLegislativoController>(TrabajoLegislativoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
