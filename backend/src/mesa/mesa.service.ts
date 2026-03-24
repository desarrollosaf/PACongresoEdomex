import { Injectable } from '@nestjs/common';
import { Comision } from 'src/database/entities/comisiones.entity';
import { Diputado } from 'src/database/entities/diputado.entity';
import { Foto } from 'src/database/entities/fotos.entity';
import { IntegranteComision } from 'src/database/entities/integrante-comisions.entity';
import { IntegranteLegislatura } from 'src/database/entities/integrante-legislatura.entity';
import { TipoCargoComision } from 'src/database/entities/tipo-cargo-comision.entity';

@Injectable()
export class MesaService {

    async findAll() {
        const comision = await Comision.findOne({
            where:{
                nombre: "DIP PERMANENTE DEL SEGUNDO ANO EJERCICIO CONSTITUCIONAL 03-DIC-2025 AL 31-ENE-26"
            }
        })

        return await IntegranteComision.findAll({
            where:{
                comision_id: comision?.id
            },
            include:[
                {
                model: TipoCargoComision,
                as: "tipo_cargo", 
                },
                {
                    model: IntegranteLegislatura,
                    as: "integranteLegis",
                    include: [
                        {  
                        model: Diputado,
                        as: "diputado",
                        include:[
                            {
                                model: Foto,
                                as: "fotos"
                            }
                        ]
                        },
                    ]
                }, 
            ],
            order: [
                [
                    {
                         model: TipoCargoComision, 
                         as: 'tipo_cargo' 
                    }
                    , 'nivel', 'ASC'
                ]
            ]
        })
    }
}
