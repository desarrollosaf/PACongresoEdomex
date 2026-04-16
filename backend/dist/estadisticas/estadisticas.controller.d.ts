import { EstadisticasService } from './estadisticas.service';
export declare class EstadisticasController {
    private readonly estadisticasService;
    constructor(estadisticasService: EstadisticasService);
    registrarVisita(ruta: string, sumar?: boolean): Promise<{
        exito: boolean;
        visitas_totales: number;
        ruta?: undefined;
    } | {
        exito: boolean;
        ruta: string;
        visitas_totales: number;
    }>;
    guardarEncuesta(ruta: string, calificacion: number, comentario?: string): Promise<{
        exito: boolean;
        datos?: undefined;
    } | {
        exito: boolean;
        datos: import("../database/entities/encuesta-satisfaccion.entity").EncuestaSatisfaccion;
    }>;
    guardarEncuestaDetallada(ruta: string, respuestas: any): Promise<{
        exito: boolean;
        datos?: undefined;
    } | {
        exito: boolean;
        datos: import("../database/entities/encuesta-satisfaccion-detallada.entity").EncuestaSatisfaccionDetallada;
    }>;
}
