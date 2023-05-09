import { sequelize } from '@/modules/BaseDao';
import { convert } from '../types/index';
// import findCtgy from '../model/OneToMany';

class CtgyDao {
  static ctgyDao: CtgyDao = new CtgyDao();
  async findCtgys(firstctgyId: string) {
    const sql = `select * from secondctgy sc inner join thirdctgy tc on sc.secondctgyId = tc.secondctgyId where sc.firstctgyId=${firstctgyId}`;
    // const result = await findCtgy(parseInt(firstctgyId));
    const [result]: any[] = await sequelize.query(sql);
    return convert(result);
  }
}
export const ctgyDao = CtgyDao.ctgyDao;
