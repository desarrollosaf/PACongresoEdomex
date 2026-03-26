import { Injectable } from '@nestjs/common';
import { Banners } from 'src/database/entities/banners.entity';
import { Foto } from 'src/database/entities/fotos.entity';

@Injectable()
export class BannersService {
    async findAll() {
        return await Banners.findAll({
            include:{
                model: Foto,
                as: "fotos"
            },
            order: [
                ['orden', 'ASC']
            ]
        })
    }
}
