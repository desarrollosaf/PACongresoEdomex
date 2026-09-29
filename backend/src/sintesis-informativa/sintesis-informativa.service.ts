import { Injectable } from '@nestjs/common';
import { SintesisInformativa } from 'src/database/entities/sintesis-informativa.entity';

@Injectable()
export class SintesisInformativaService {
  async findAll(pagina: number, fecha?: string) {
    const limit = 10;

    return await SintesisInformativa.findAndCountAll({
      where: fecha ? { fecha } : undefined,
      offset: (pagina - 1) * limit,
      limit,
      order: [['fecha', 'DESC']],
    });
  }
}
