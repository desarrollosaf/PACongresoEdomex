import { Test, TestingModule } from '@nestjs/testing';
import { JuntaController } from './junta.controller';
import { JuntaService } from './junta.service';

describe('JuntaController', () => {
  let controller: JuntaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JuntaController],
      providers: [JuntaService],
    }).compile();

    controller = module.get<JuntaController>(JuntaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
