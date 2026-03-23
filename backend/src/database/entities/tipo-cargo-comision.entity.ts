import { Column, Model, Table, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';


@Table({ tableName: 'tipo_cargo_comisions', underscored: true, timestamps: true, paranoid: false, charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' })
export class TipoCargoComision extends Model {
    @Column({ type: DataType.CHAR(36), primaryKey: true, defaultValue: DataType.UUIDV4 })
    declare id: string;

    @Column({ type: DataType.STRING })
    declare valor: string;

    @Column({ type: DataType.NUMBER })
    declare nivel: string;
}