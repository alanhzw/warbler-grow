/*
 * @Description: 
 * @Date: 2021-06-09 11:00:20
 * @LastEditTime: 2021-06-11 17:35:31
 * @FilePath: \day1\js\index.js
 */

// 车辆
class Car {
  constructor(number){
    this.num = number
  }
}

//摄像头

class Camera{
  shot(car){
    return{
      num: car.num,
      inTime: Date.now()
    }
  }
}

//显示器
class Screen {
  show(car,inTime){
    console.log('🚀🚀~ 车牌号:',car.num);
    console.log('🚀🚀~ 停车时间:',Date.now() - inTime);
  }
}
// 停车场
class Park{
  constructor(floors){
    this.floors = floors || []
    this.camera = new Camera();
    this.screen = new Screen();
    this.carList = {}
  }
  in(car){
    //通过摄像头获取信息
    const info = this.camera.shot(car)
    //停到某个停车位
    const i = parseInt(Math.random()*100%100)
    const  place = this.floors[0].places[i]
    place.in()
    info.place = place
    //记录信息
    this.carList[car.num] = info
  }
  out(car){
    //获取信息
    const info = this.carList[car.num]
    //将停车位清空
    const place = info.place
    place.out()
    //显示时间
    this.screen.show(car,info.inTime)
    //清空记录
    delete this.carList[car.num]
    
  }
  emptyNum(){
    return this.floors.map((floor)=>{
      return `${floor.index} 层还有${floor.emptyPlaceNum()}个车位`  
    }).join("\n")
  }
}
// 层
class Floor{
  constructor(index,places){
    this.index = index
    this.places = places || []
  }
  emptyPlaceNum(){
    let num = 0
    this.places.forEach((place)=>{
      if(place.empty){
        num = num + 1
      }
    })
    return num
  }
}

// 车位

class Place{
  constructor(){
    this.empty = true
  }
  in(){
    this.empty = false
  }
  out(){
    this.empty = true
  }
}


//初始化停车场

const floors = []

for(let i=0;i<3;i++){
  const places=[]
  for(let j=0;j<100;j++){
    places[j]=new Place()
  }
  floors[i] = new Floor(i+1,places)
}

const park = new Park(floors)

//初始化

const car1 = new Car(100)
const car2 = new Car(200)
const car3 = new Car(300)

park.in(car1)

console.log('🚀🚀~ 第1辆车进入:',1);
console.log('🚀🚀~ 剩余车位:',park.emptyNum());
park.in(car2)

console.log('🚀🚀~ 第2辆车进入:',2);
console.log('🚀🚀~ 剩余车位:',park.emptyNum());

park.out(car1)

console.log('🚀🚀~ 第1辆车离开:',1);
console.log('🚀🚀~ 剩余车位:',park.emptyNum());

park.out(car2)

console.log('🚀🚀~ 第2辆车离开:',1);
console.log('🚀🚀~ 剩余车位:',park.emptyNum());


park.in(car3)

console.log('🚀🚀~ 第3辆车进入:',1);
console.log('🚀🚀~ 剩余车位:',park.emptyNum());
park.out(car3)
console.log('🚀🚀~ 第3辆车离开:',1);