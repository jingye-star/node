const app = require('./app')
const http = require('http')

const server = http.createServer()

const port = process.env.PROT || 3001
server.listen(port, () => {
    console.log('3001');
})