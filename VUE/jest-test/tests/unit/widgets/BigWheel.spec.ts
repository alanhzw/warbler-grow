/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-16 17:12:34
 * @LastEditTime: 2021-11-19 17:20:25
 * @FilePath: \jest-test\tests\unit\widgets\BigWheel.spec.ts
 */
import BigWheel from "../../../src/widgets/big-wheel/BigWheel.vue";
// @ts-ignore
import initData from "@/assets/prizeData.json";
import { mount, VueWrapper } from "@vue/test-utils";

describe("big-wheel 部件", () => {
  let wrapper: VueWrapper<any>;
  beforeAll(() => {
    wrapper = mount(BigWheel);
  });
  it("加载", () => {
    expect(wrapper.find(".big-wheel").exists()).toBeTruthy();
  });
  it("转盘,背景图片", () => {
    const platePic = "plate.png";
    wrapper
      .setProps({
        plate: platePic,
      })
      .then(() => {
        const plate = wrapper.find(".plate");
        expect(plate.exists()).toBeTruthy();
        const { style } = plate.attributes();
        const styles: any = {};
        style.split("; ").forEach((kv: string) => {
          const [k, v] = kv.split(": ");
          styles[k] = v;
        });
        expect(styles.width).toBe(styles.height);
        expect(styles.backgroundImage).toEqual(`url(${platePic})`);
      });
  });
  it("绘制奖品", () => {
    wrapper
      .setProps({
        prizes: initData,
      })
      .then(() => {
        expect(wrapper.findAll(".prize").length).toBe(initData.length);
      });
  });
});
