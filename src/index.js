const port = 7331
const io = require('socket.io').listen(port)
const uuid = require('uuid/v4')

console.log(`SOCKET.IO SERVER listening on port ${port}`)

// TODO: create rooms for each document
io.on('connection', (socket) => {
  console.log('-- socket connected')
  socket.emit('connected')

  socket.on('create', () => {
    const id = uuid()
    console.log('--- new document, id: ', id)
    socket.emit('created', id)
  })

  socket.on('join', (id) => {
    console.log('--- join document room: ', id)
    socket.emit('joined', id)
  })
})
