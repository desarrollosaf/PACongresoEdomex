import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Monitoreo } from 'src/database/entities/monitoreo.entity';
import { Op } from 'sequelize';

const PAGE_SIZE = 10;

@Injectable()
export class MonitoreoService {
  constructor(
    @InjectModel(Monitoreo)
    private monitoreoModel: typeof Monitoreo,
  ) {}

  async findAll(page: number = 1) {
    const offset = (page - 1) * PAGE_SIZE;

    const { count, rows } = await this.monitoreoModel.findAndCountAll({
      order: [['fecha', 'DESC']],
      limit: PAGE_SIZE,
      offset,
    });

    return {
      data: rows,
      total: count,
      page,
      pageSize: PAGE_SIZE,
      totalPages: Math.ceil(count / PAGE_SIZE),
    };
  }
}
