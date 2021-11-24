/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-24 16:18:29
 * @LastEditTime: 2021-11-24 16:20:59
 * @FilePath: \jest-test\tests\unit\widgets\lotic.spec.ts
 */

import { rotatePlateToPrize } from "@/widgets/logic";

describe("lotic.ts", () => {
  it("rotatePlateToPrize", () => {
    expect(rotatePlateToPrize(6, 8)).toBe(0.25);
    expect(rotatePlateToPrize(4, 8)).toBe(0.5);
  });
});
