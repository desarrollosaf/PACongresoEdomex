import { Controller, Post, Body } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  @Post('visita')
  async registrarVisita(
    @Body('ruta') ruta: string,
    @Body('sumar') sumar?: boolean
  ) {
    return this.estadisticasService.registrarVisita(ruta, sumar !== false);
  }

  @Post('encuesta')
  async guardarEncuesta(
    @Body('ruta') ruta: string,
    @Body('calificacion') calificacion: number,
    @Body('comentario') comentario?: string
  ) {
    return this.estadisticasService.guardarEncuesta(ruta, calificacion, comentario);
  }

  @Post('encuesta-detallada')
  async guardarEncuestaDetallada(
    @Body('ruta') ruta: string,
    @Body('respuestas') respuestas: any
  ) {
    return this.estadisticasService.guardarEncuestaDetallada(ruta, respuestas);
  }
}

