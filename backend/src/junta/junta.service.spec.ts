import { Test, TestingModule } from '@nestjs/testing';
import { JuntaService } from './junta.service';

describe('JuntaService', () => {
  let service: JuntaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JuntaService],
    }).compile();

    service = module.get<JuntaService>(JuntaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
