let fs = require('fs')
let thunkify = require('thunkify')

let readFileThunk = thunkify(fs.readFile)

let gen = function* () {
  let r1 = yield readFileThunk('./index.md')
  console.log(r1.toString())
  let r2 = yield readFileThunk('./index.js')
  console.log(r2.toString()) 
}
// 手动执行
let g = gen()

let r1 = g.next()
r1.value((err, data) => {
  if(err) throw err
  var r2 = g.next(data)
  r2.value((err, data) => {
    if(err) throw err
    g.next(data)
  })
})

// 自动执行
function run(fn) {
  let gen = fn()

  function next(err, data) {
    if(err) throw err
    var result = gen.next(data)
    if(result.done) return
    result.value(next)
  }

  next()
}

run(gen)