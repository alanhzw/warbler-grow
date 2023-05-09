import { sequelize } from '@/modules/BaseDao';
import { DataTypes } from 'sequelize';

class UserModel {
  static createModel() {
    const model = sequelize.define(
      'userinfo',
      {
        userid: {
          type: DataTypes.INTEGER,
          field: 'userid', // 不写默认使用属性名
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING(30),
          field: 'username',
          allowNull: false,
        },
        pwd: {
          type: DataTypes.STRING(30),
          field: 'pwd',
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(50),
          field: 'address',
          allowNull: true,
        },
        valid: {
          type: DataTypes.TINYINT,
          field: 'valid',
          allowNull: true,
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
export const userModel = UserModel.createModel();
