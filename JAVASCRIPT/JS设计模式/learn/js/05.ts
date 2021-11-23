/*
 * @Description:状态模式
 * @Date: 2021-06-22 14:33:37
 * @LastEditTime: 2021-06-24 17:42:55
 * @FilePath: \day1\js\05.ts
 */

class State {}

class SuccessState extends State {}
class WarnningState extends State {}
class ErrorState extends State {}

class Battery {
  amount: string;
  state: State;
  constructor(state: State) {
    this.amount = 'high';
    this.state = new SuccessState();
  }
}
