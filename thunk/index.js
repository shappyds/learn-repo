// 传值调用

let x = 1

let f = m => m * 2

f(x + 5) // => f(6) 在进入函数之前，就计算x + 5的值即6，再将这个值传入函数f

// 传名调用

f(x + 5) // 直接将x+5传入函数体，只在用到它的时候求值

// JS中的thunk

// 正常版本的readFile(多参数)
fs.readFile(fileName, callback)

// thunk版本
const thunk = fileName => callback => fs.readFile(fileName, callback)
// thunk版本的readFile(单参数)，readFileThunk就是一个Thunk函数
var readFileThunk = thunk(fileName)
readFileThunk(callback)

// thunk转换器

const Thunk = function(fn) {
  return function() {
    let args = Array.from(arguments)
    
    return function(callback) {
      args.push(callback)
      return fn.apply(this, args)
    } 
  }
}