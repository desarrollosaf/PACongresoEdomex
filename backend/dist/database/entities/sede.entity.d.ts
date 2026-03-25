import { Model } from 'sequelize-typescript';
import { Agenda } from './agenda.entity';
export declare class Sede extends Model {
    id: string;
    sede: string | null;
    created_at: Date;
    updated_at: Date;
    agendas: Agenda[];
}
