function aaaa(Target: new (...args: any) => any) {
  console.log(Target.prototype);
}

function testFn(targetClassPrototype: any, methodName: string, dataprops: PropertyDescriptor) {
  dataprops.value();
}

@aaaa
class Test {
  name!: string;
  age!: number;
  constructor(name: string) {
    this.name = name;
  }

  @testFn
  eat() {
    console.log(`${this.name}吃`);
  }
}

export {};
