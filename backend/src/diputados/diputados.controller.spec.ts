import { Test, TestingModule } from '@nestjs/testing';
import { DiputadosController } from './diputados.controller';
import { DiputadosService } from './diputados.service';

describe('DiputadosController', () => {
  let controller: DiputadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiputadosController],
      providers: [DiputadosService],
    }).compile();

    controller = module.get<DiputadosController>(DiputadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
