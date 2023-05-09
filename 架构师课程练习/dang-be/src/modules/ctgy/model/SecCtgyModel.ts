import { sequelize } from '@/modules/BaseDao';
import { DataTypes } from 'sequelize';

class SecondCtgyModel {
  static createModel() {
    const model = sequelize.define(
      'secondctgy',
      {
        secondctgyId: {
          type: DataTypes.INTEGER,
          field: 'secondctgyId', // 不写默认使用属性名
          primaryKey: true,
          autoIncrement: true,
        },
        secctgyName: {
          type: DataTypes.STRING(20),
          field: 'secctgyName',
          allowNull: false,
        },
        firstctgyId: {
          type: DataTypes.INTEGER,
          field: 'firstctgyId',
          allowNull: false,
        },
      },
      // {
      //   timestamps: false, // true 表示给模型加上时间戳属性 (createAt,updateAt),false 标识不带时间戳属性
      //   freezeTableName: true, // true 标识使用给定的表名, false 标识模型后名加s作为表名
      // },
    );
    // model.sync({ force: false, alter: true }).catch(() => {}); // force true 强制同步数据表
    return model;
  }
}
export const secondCtgyModel = SecondCtgyModel.createModel();
