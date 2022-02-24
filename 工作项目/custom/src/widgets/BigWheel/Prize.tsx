import {
  PropType,
  defineComponent,
} from 'vue';
import styles from './Prize.module.scss';

// 奖品信息结构体
interface Prize {
  prizeName: string, // 奖品名称
  prizeDesc: string, // 奖品描述
  prizePic: string, // 奖品图片
  prizeType: number, // 奖品类型
  prizeId: number | string, // 奖品ID
}

interface PrizeProp {
  prize: Prize
}

/**
 * 实物商品
 *
 * @param {PrizeProp} { prize }商品信息
 */
const Product = ({ prize }: PrizeProp) => (
  <>
    <div class={styles['prize-name']}>{prize.prizeName}</div>
    <div class={styles['prize-product']} style={{
      backgroundImage: `url(${prize.prizePic})`,
    }}
    ></div>
  </>
);

/**
 * 优惠券/京豆
 *
 * @param {PrizeProp} { prize }商品信息
 */
const CouponOrBean = ({ prize }: PrizeProp) => (
  <>
    <div class={styles['prize-name']}>{prize.prizeName}</div>
    <div style={{
      fontSize: '60px',
      height: '120px',
      lineHeight: '120px',
    }}>{prize.prizeDesc}</div>
  </>
);

/**
 * 其他（再来一次/谢谢参与）
 *
 * @param {PrizeProp} { prize }商品信息
 */
const Other = ({ prize }: PrizeProp) => (<div class={styles['prize-other']}>{prize.prizeDesc}</div>);

const getPrizeComp = (prize: Prize) => {
  switch (prize.prizeType) {
    case 1:
      return (<Product prize={prize} />);
    case 2:
    case 3:
      return (<CouponOrBean prize={prize} />);
    default:
      return (<Other prize={prize} />);
  }
};

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Prize>,
      required: true,
    },
    scale: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    return () => <div class={styles['prize-wrapper']} style={{ transform: `scale(${props.scale})` }}>{getPrizeComp(props.data)}</div>;
  },
});
