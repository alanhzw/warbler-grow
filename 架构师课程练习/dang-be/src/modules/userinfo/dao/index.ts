import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { userModel } from '../model';

export interface Userinfo {
  userid: number;
  username: string;
  psw: string;
  address: string;
  valid: number;
}
class UserDao {
  static userDao: UserDao = new UserDao();
  // 添加数据
  async addUser(userinfo: Userinfo) {
    // 不用 any 会报错， 不会改
    return await userModel.create(userinfo as any);
  }

  // 查询所有数据
  async findAllUser() {
    return await userModel.findAll({ raw: true });
  }

  // 只查询部分属性
  async findByProps() {
    return await userModel.findAll({
      raw: true,
      attributes: ['username', 'pwd'],
    });
  }

  // 精确查询
  async findByUsernameAndPsw(username: string, psw: string) {
    return await userModel.findOne({
      raw: true,
      where: {
        [Op.or]: [
          {
            username,
          },
          {
            psw,
          },
        ],
      },
    });
  }

  // 模糊查询
  async findByLike(key: string) {
    const searchKey = `%${key}%`;
    return await userModel.findAll({
      raw: true,
      where: {
        username: {
          [Op.like]: searchKey,
        },
      },
    });
  }

  // 模糊查询 or
  async findByUsmAndAddr() {
    return await userModel.findAll({
      raw: true,
      where: {
        [Op.or]: [
          {
            username: {
              [Op.like]: '%王',
            },
          },
          {
            address: '武汉',
          },
        ],
      },
    });
  }

  // 聚合查询
  async countUserInfo() {
    return await userModel.findAll({
      raw: true,
      group: 'address',
      attributes: ['address', [Sequelize.fn('count', Sequelize.col('valid')), '总人数']],
      where: {
        valid: 1,
      },
    });
  }

  // 分页查询
  async findUserWithPager(limit: number, offset: number) {
    return await userModel.findAll({
      raw: true,
      limit: 3,
      offset: 5,
    });
  }
}

export const userDao = UserDao.userDao;
