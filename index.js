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
        socket.emit('session changed', state.get_state())
        socket.emit('set state', state.get_state())
        socket.emit('new message', '<span style="color: #2bff2b; font-weight: bolder">Maid : o usuário de nome ' + state.get_state().users[0][e.id].nickname + ' se conectou ao chat.</span>')
        console.log(res)
    })

    e.on('set nickname', evt => {
        state.set_user_property('nickname', e.id, evt).then(res => {
            socket.emit('session changed', state.get_state())
            socket.emit('set state', state.get_state())
            console.log(res)
        })
    })

    e.on('new message', evt => {
        state.set_message_state(evt).then(res => { 
            let current_state = state.get_state()
            socket.emit('new message', current_state.users[0][evt.id].nickname + ' : ' + evt.msg)
            console.log(res)
        })
    })
    e.on('disconnect', reason => {
        let current_state = state.get_state()
        socket.emit('new message', '<span style="color: #ff2424; font-weight: bolder">Maid : o usuário de nome ' + current_state.users[0][e.id].nickname + ' se desconectou do chat.</span>')
        state.remove_user_state(e.id).then(res => {
            socket.emit('session changed', state.get_state())
            console.log(state.get_state())
            console.log(res)
        })
    })    
});
http.listen(8080, '0.0.0.0', e => {
    console.log('Server is running.')
})