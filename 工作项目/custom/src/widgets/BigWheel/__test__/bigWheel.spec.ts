import { mount } from '@vue/test-utils';
import BigWheel from '../BigWheel.vue';

const prizesData = [
  {
    prizeName: '实物奖品1',
    prizeDesc: '',
    prizePic: '',
    prizeType: 1,
    prizeId: 0,
  }, {
    prizeName: '优惠券',
    prizeDesc: '200',
    prizePic: '',
    prizeType: 2,
    prizeId: 1,
  }, {
    prizeName: '再来一次',
    prizeDesc: '再来一次',
    prizePic: '',
    prizeType: 4,
    prizeId: 2,
  }, {
    prizeName: '京豆',
    prizeDesc: '20',
    prizePic: '',
    prizeType: 3,
    prizeId: 3,
  }, {
    prizeName: '实物商品2',
    prizeDesc: '',
    prizePic: '',
    prizeType: 1,
    prizeId: 4,
  }, {
    prizeName: '优惠券',
    prizeDesc: '100',
    prizePic: '',
    prizeType: 2,
    prizeId: 5,
  }, {
    prizeName: '谢谢参与',
    prizeDesc: '谢谢参与',
    prizePic: '',
    prizeType: -1,
    prizeId: 6,
  }, {
    prizeName: '京豆',
    prizeDesc: '50',
    prizePic: '',
    prizeType: 3,
    prizeId: 7,
  },
];
describe('BigWheel.vue', () => {
  const wrapper = mount(BigWheel, {
    props: {
      prizes: prizesData,
    },
  });
  it('Each prize has a sector on plate', () => {
    expect(wrapper.findAll('.prize').length).toBe(prizesData.length);
  });

  it('Each prize has exact angle', () => {
    // expect(wrapper.findAll('.prize')[2].element.getAttribute('style')).toContain('rotate(0.25turn)');
    // expect(wrapper.findAll('.prize')[5].element.getAttribute('style')).toContain('rotate(0.625turn)');
    wrapper.findAll('.prize').forEach((elm, index) => {
      expect(elm.element.getAttribute('style')).toContain(`rotate(${index / prizesData.length}turn)`);
    });
  });
});
