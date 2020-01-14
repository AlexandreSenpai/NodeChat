const app = require('express')()
const http = require('http').createServer(app)
const socket = require('socket.io')(http)
const State = require('./state.js')
let state = new State()

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/static/index.html')
})

socket.on('connection', e => {
    state.set_user_state(e.id).then(res => {
        socket.emit('set state', state.state)
        console.log(res)
    })
    e.on('new message', evt => {
        state.set_message_state(evt).then(e => { 
            socket.emit('new message', evt.id + ' : ' + evt.msg)
            socket.emit('set state', state.state)
            console.log(e)
        })
    })
    e.on('disconnect', reason => {
        state.remove_user_state(e.id).then(res => {
            socket.emit('set state', state.state)
            console.log(res)
        })
    })    
});
http.listen(8080, '0.0.0.0', e => {
    console.log('Server is running.')
})