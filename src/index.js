const port = 80
const io = require('socket.io').listen(port)
const uuid = require('uuid/v4')

console.log(`SOCKET.IO SERVER listening on port ${port}`)

io.on('connection', (socket) => {
  console.log('-- socket connected')
  socket.emit('connected')

  socket.on('create', () => {
    const id = uuid()
    console.log('--- new document, id:', id)
    socket.join(id)
    socket.emit('created', id)
  })

  socket.on('join', (id) => {
    console.log('--- join document:', id)
    socket.join(id)
    socket.emit('joined', id)

    const {remoteAddress, remotePort} = socket.request.connection
    console.log(`--- client address:`, {remoteAddress, remotePort})
    socket.broadcast.to(id).emit('newPeer', {remoteAddress, remotePort})
  })

  socket.on('documentChange', ({id, data}) => {
    console.log(`--- document ${id} changed:`, data)
    socket.broadcast.to(id).emit('documentChanged', {id, data})
  })
})
