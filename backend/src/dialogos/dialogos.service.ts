import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Dialogo } from 'src/database/entities/dialogo.entity';

@Injectable()
export class DialogosService {

   async findAll() {
        return Dialogo.findOne({
            order: [['id','DESC']]
        });
    }

}