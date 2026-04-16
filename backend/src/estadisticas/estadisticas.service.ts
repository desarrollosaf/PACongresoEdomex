import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VisitaPagina } from '../database/entities/visita-pagina.entity';
import { EncuestaSatisfaccion } from '../database/entities/encuesta-satisfaccion.entity';
import { EncuestaSatisfaccionDetallada } from '../database/entities/encuesta-satisfaccion-detallada.entity';

@Injectable()
export class EstadisticasService {
  constructor(
    @InjectModel(VisitaPagina)
    private visitaModel: typeof VisitaPagina,
    @InjectModel(EncuestaSatisfaccion)
    private encuestaModel: typeof EncuestaSatisfaccion,
    @InjectModel(EncuestaSatisfaccionDetallada)
    private encuestaDetalladaModel: typeof EncuestaSatisfaccionDetallada,
  ) {}

  async registrarVisita(ruta: string, sumar: boolean = true) {
    if (!ruta) return { exito: false, visitas_totales: 0 };
    
    // Buscar si existe
    let visita = await this.visitaModel.findOne({ where: { ruta } });
    if (visita) {
      if (sumar) {
        visita.contador += 1;
        await visita.save();
      }
    } else {
      if (sumar) {
        visita = await this.visitaModel.create({ ruta, contador: 1 });
      } else {
        return {
          exito: true,
          ruta,
          visitas_totales: 0
        };
      }
    }
    
    return {
      exito: true,
      ruta,
      visitas_totales: visita.contador
    };
  }

  async guardarEncuesta(ruta: string, calificacion: number, comentario?: string) {
    if (!ruta || !calificacion) return { exito: false };

    const nueva = await this.encuestaModel.create({
      ruta,
      calificacion,
      comentario
    });

    return {
      exito: true,
      datos: nueva
    };
  }

  async guardarEncuestaDetallada(ruta: string, respuestas: any) {
    if (!respuestas || Object.keys(respuestas).length === 0) return { exito: false };

    const nueva = await this.encuestaDetalladaModel.create({
      ruta: ruta || '/',
      experiencia_general: respuestas.p1 || 0,
      facilidad_navegacion: respuestas.p2 || 0,
      claridad_informacion: respuestas.p3 || 0,
      diseno_presentacion: respuestas.p4 || 0,
      utilidad_contenido: respuestas.p5 || 0
    });

    return {
      exito: true,
      datos: nueva
    };
  }
}

