/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-24 14:40:04
 * @LastEditTime: 2021-11-25 10:25:13
 * @FilePath: \my-mini-vue-kkb\MyVue.js
 */


/**
 * @param {*} obj  目标对象
 * @param {*} key  目标对象的一个属性
 * @param {*} val  目标对象的一个属性的初始值
 */
function defineReactive(obj, key, val) {
  // 递归
  observe(val)
  // 通过该方法拦截数据
  Object.defineProperty(obj, key, {
    // 读取数据的时候会走这里
    get() {
      console.log('🚀🚀~ get:', key);
      return val
    },
    // 更新数据的时候会走这里
    set(newVal) {
      // 只有当新值和旧值不同的时候 才会触发重新赋值操作
      if (newVal !== val) {
        console.log('🚀🚀~ set:', key);
        // 如果 newVal 是个对象类型,再次做响应式处理。
        if (typeof obj === 'object' && obj !== null) {
          observe(newVal)
        }
        val = newVal
      }
    }
  })
}


// 遍历obj 对其每个属性进行响应式处理
function observe(obj) {
  // 先判断类型, 响应式处理的目标一定要是个对象类型
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  new Observer(obj)
}

/**
 * @param {*} obj  目标对象
 * @param {*} key  目标对象的一个属性
 * @param {*} val  目标对象的一个属性的初始值
 */
function set(obj, key, val) {
  defineReactive(obj, key, val)
}


/**
 * 代理 把 this.$data 上的属性 全部挂载到 vue实例上 可以通过 this.key 访问 this.$data.key
 * @param {*} vm vue 实例
 */
function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    // 通过  Object.defineProperty 方法进行代理 这样访问 this.key 等价于访问 this.$data.key
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(newValue) {
        vm.$data[key] = newValue
      }
    })
  })
}


// 根据传入value的类型做响应的响应式处理
class Observer {
  constructor(value) {
    this.value = value
    if (Array.isArray(value)) {
      // todo  数组的响应式处理方式
    } else {
      // 对象的响应式处理方式
      this.walk(value)
    }
  }

  // 对象的响应式处理
  walk(obj) {
    // 遍历 obj, 对 obj 的每个属性进行响应式处理
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}


/**
 * 1.对data选项做响应式处理
 * 2.编译模板
 */
class MyVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data

    // data响应式处理
    observe(this.$data)

    // 代理 把 this.$data 上的属性 全部挂载到 vue实例上 可以通过 this.key 访问 this.$data.key
    proxy(this)

    //
    new Compile(options.el, this)
  }
}


// 解析模板语法
// 1.处理插值表达式{{}}
// 2.处理指令和事件
// 3.以上两者初始化和更新
class Compile {
  /**
   * @param {*} el 宿主元素
   * @param {*} vm vue实例
   */
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    // 如果元素存在,执行编译
    if (this.$el) {
      this.compile(this.$el)
    }
  }

  // 编译
  compile(el) {
    // 编译el的子节点,判断它们的类型做响应的处理
    const childNodes = el.childNodes
    childNodes.forEach(node => {
      // 判断节点的类型 本文以元素和文本为主要内容 不考虑其他类型
      if (node.nodeType === 1) { // 这个分支代表节点的类型是元素

        // 获取到元素上的属性
        const attrs = node.attributes
        // 把 attrs 转换成真实数组
        Array.from(attrs).forEach(attr => {
          // 指令长 my-xxx = 'abc'  这个样子
          // 获取节点属性名
          const attrName = attr.name
          // 获取节点属性值
          const exp = attr.value
          // 判断节点属性是不是一个指令
          if (attrName.startsWith('my-')) {
            // 获取具体的指令类型 也就是 my-xxx 后面的 xxx 部分
            const dir = attrName.substring(3)
            // 如果this[xxx]指令存在  执行这个指令
            this[dir] && this[dir](node, exp)

          }
        })

      } else if (this.isInter(node)) { // 这个分支代表节点的类型是文本 并且是个插值语法{{}}

        // 文本的初始化
        this.compileText(node)
      }
      // 递归遍历 dom 树
      if (node.childNodes) {
        this.compile(node)
      }
    })
  }

  // 编译文本
  compileText(node) {
    // 可以通过 RegExp.$1 来获取到 插值表达式中间的内容 {{key}}
    // this.$vm[RegExp.$1] 等价于 this.$vm[key]
    // 然后把这个 this.$vm[key] 的值 赋值给文本 就完成了 文本的初始化
    node.textContent = this.$vm[RegExp.$1]
  }

  // my-text 指令对应的方法
  text(node, exp) {
    // 这个指令用来修改节点的文本,这个指令长这样子 my-text = 'key'
    // 把 this.$vm[key] 赋值给文本 即可
    node.textContent = this.$vm[exp]
  }

  // my-html 指令对应的方法
  html(node, exp) {
    // 这个指令用来修改节点的文本,这个指令长这样子 my-html = 'key'
    // 把 this.$vm[key] 赋值给innerHTML 即可
    node.innerHTML = this.$vm[exp]
  }

  // 是否是插值表达式{{}}
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

}

