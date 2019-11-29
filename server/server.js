const server = require('http').createServer();

server.listen(3001, function (err) {
    if (err) throw err
    console.log('listening on port 3001')
  })
  