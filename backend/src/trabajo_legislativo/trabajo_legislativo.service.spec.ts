import { Test, TestingModule } from '@nestjs/testing';
import { TrabajoLegislativoService } from './trabajo_legislativo.service';

describe('TrabajoLegislativoService', () => {
  let service: TrabajoLegislativoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrabajoLegislativoService],
    }).compile();

    service = module.get<TrabajoLegislativoService>(TrabajoLegislativoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
