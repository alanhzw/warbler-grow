import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'userinfo',
})
export default class UserinfoModel extends Model<UserinfoModel> {
  @Column({
    type: DataTypes.INTEGER,
    field: 'userid', // 不写默认使用属性名
    primaryKey: true,
    autoIncrement: true,
  })
  userid!: number;

  @Column({
    type: DataTypes.STRING(30),
    field: 'username', // 不写默认使用属性名
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataTypes.STRING(30),
    field: 'pwd', // 不写默认使用属性名
    allowNull: false,
  })
  pwd!: string;

  @Column({
    type: DataTypes.STRING(50),
    field: 'address', // 不写默认使用属性名
    allowNull: true,
  })
  address!: string;

  @Column({
    type: DataTypes.TINYINT,
    field: 'valid', // 不写默认使用属性名
    allowNull: true,
  })
  field!: number;
}
