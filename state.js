module.exports = class State{
    constructor(){
        this.state = {
            messages: [],
            users: [{}]
        }
    }

    get_state = () => {
        return this.state
    }

    set_user_property(prop, user_id, arg){
        return new Promise(resolve => {
            if(this.state.users[0][user_id][prop]){
                this.state.users[0][user_id][prop] = arg
                resolve('User state has been changed successfully.')
            }
        })
    }

    set_message_state = (new_message) => {
        return new Promise(resolve => {
            new_message['nickname'] = this.state.users[0][new_message.id].nickname
            this.state.messages.push(new_message)
            resolve('New message has been added to chat history successfully.')
        })
    }

    set_user_state = (new_user) => {
        return new Promise(resolve => {
            this.state.users[0][new_user] = { id: new_user, nickname: 'anônimo', avatar: null, is_admin: false }
            resolve('New user has been added to user list successfully.')
        })
    }

    remove_user_state = (old_user) => {
        return new Promise(response => {
            delete this.state.users[0][old_user]
            response(old_user + ' has been deleted successfully.')
        })
    }
}