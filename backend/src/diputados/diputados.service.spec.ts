import { Test, TestingModule } from '@nestjs/testing';
import { DiputadosService } from './diputados.service';

describe('DiputadosService', () => {
  let service: DiputadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiputadosService],
    }).compile();

    service = module.get<DiputadosService>(DiputadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
