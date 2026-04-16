import { VisitaPagina } from '../database/entities/visita-pagina.entity';
import { EncuestaSatisfaccion } from '../database/entities/encuesta-satisfaccion.entity';
import { EncuestaSatisfaccionDetallada } from '../database/entities/encuesta-satisfaccion-detallada.entity';
export declare class EstadisticasService {
    private visitaModel;
    private encuestaModel;
    private encuestaDetalladaModel;
    constructor(visitaModel: typeof VisitaPagina, encuestaModel: typeof EncuestaSatisfaccion, encuestaDetalladaModel: typeof EncuestaSatisfaccionDetallada);
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
        datos: EncuestaSatisfaccion;
    }>;
    guardarEncuestaDetallada(ruta: string, respuestas: any): Promise<{
        exito: boolean;
        datos?: undefined;
    } | {
        exito: boolean;
        datos: EncuestaSatisfaccionDetallada;
    }>;
}
