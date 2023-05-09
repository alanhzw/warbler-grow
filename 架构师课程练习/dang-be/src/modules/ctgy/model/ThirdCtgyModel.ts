import { sequelize } from '@/modules/BaseDao';
import { DataTypes } from 'sequelize';

class ThirdCtgyModel {
  static createModel() {
    const model = sequelize.define(
      'thirdctgy',
      {
        thirdctgyId: {
          type: DataTypes.INTEGER,
          field: 'thirdctgyId', // 不写默认使用属性名
          primaryKey: true,
          autoIncrement: true,
        },
        thirdctgyName: {
          type: DataTypes.STRING(20),
          field: 'thirdctgyName',
          allowNull: false,
        },
        secondctgyId: {
          type: DataTypes.INTEGER,
          field: 'secondctgyId',
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
export const thirdCtgyModel = ThirdCtgyModel.createModel();
