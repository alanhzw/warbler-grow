function first(params: string) {
  return function firstDecorator(Target: new (...args: any) => any) {
    const targetClassInstance = new Target();
    Object.keys(Target.prototype).forEach((methodname) => {
      console.log('methodname', methodname);
    });
  };
}

@first('aa')
export class CustomerService {
  name: string = '下单';
  constructor() {
    console.log('构造函数执行');
  }

  buy() {
    console.log(`${this.name}购买`);
  }

  pay() {
    console.log(`${this.name}下单`);
  }
}
