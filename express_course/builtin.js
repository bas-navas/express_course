const os = require('os')

console.log("OS:", os.platform())
console.log("RAM", os.totalmem())
console.log("CPU:", os.cpus()[0].model)