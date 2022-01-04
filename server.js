const express = require('express');
const path = require('path')
const app = express()
const http = require('http').createServer(app)
const PORT = process.env.PORT || 3000
app.use('/public',express.static( 'public'));

http.listen(PORT,  () => {
    console.log(`Listening on Port ${PORT}`)
})

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})


// Socket

const io = require('socket.io')(http)

io.on('connection', (socket) =>{
    console.log('Connected...')

    socket.on('message',(msgObj) => {
        socket.broadcast.emit('message', msgObj)
    })
});