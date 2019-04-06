## Thunk函数

> 它是"传名调用"的一种实现策略，用来替换某个表达式。

#### 传值调用和传名调用
编译器中，函数的参数何时求值：**传值调用(call by value)**和**传名调用(call by name)**

这两种方法各有利弊，传值调用比较简单，但是对参数求值的时候，实际上还没用到这个参数，有可能造成性能损失。

> 编译器的传名调用实现，往往是将参数放到一个临时函数中，再将这个临时函数传入函数体，这个临时函数就叫做Thunk函数。

```javascript
const x = 1
const f = m => m * 2

f(x + 5)

//等同于
let thunk = () => x + 5
const f = thunk => thunk() * 2
```

#### js中的Thunk函数

[js中thunk的定义](https://daveceddia.com/what-is-a-thunk/)

```javascript 
function wrapper_function() {
  // this one is a "thunk" because it defers work for later:
  return function thunk() {   // it can be named, or anonymous
    console.log('do stuff now');
  };
}
```

js语言是传值调用，它的Thunk函数的定义有所不同，**Thunk替换的不是表达式，而是多参数函数，将其替换成单参数的版本，其只接受回调函数作为参数**。

实际使用中可使用[thunkify](https://github.com/tj/node-thunkify/blob/master/index.js)


## Generator函数的流程管理

利用thunk或者promise来自动执行generator函数