import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ tableName: 'fotos', underscored: true, timestamps: true, paranoid: true })
export class Foto extends Model {
    @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
    declare id: string;

    @Column(DataType.STRING)
    declare path: string;

    @Column(DataType.UUID)
    declare fotoable_id: string;

    @Column(DataType.STRING)
    declare fotoable_type: string;
}