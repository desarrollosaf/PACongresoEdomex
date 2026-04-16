import { Model } from 'sequelize-typescript';
export declare class EncuestaSatisfaccionDetallada extends Model {
    id: number;
    ruta: string;
    experiencia_general: number;
    facilidad_navegacion: number;
    claridad_informacion: number;
    diseno_presentacion: number;
    utilidad_contenido: number;
}
