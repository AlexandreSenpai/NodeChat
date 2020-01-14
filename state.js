module.exports = class State{
    constructor(){
        this.state = {
            messages: [],
            users: []
        }
    }

    get_state = () => {
        return this.state
    }

    set_message_state = (new_message) => {
        return new Promise(resolve => {
            this.state.messages.push(new_message)
            resolve('New message has been added to chat history.')
        })
    }

    set_user_state = (new_user) => {
        return new Promise(resolve => {
            this.state.users.push(new_user)
            resolve('New user has been added to user list.')
        })
    }

    remove_user_state = (old_user) => {
        return new Promise(response => {
            let i = this.state.users.indexOf(old_user)
            this.state.users.splice(i, 1)
            response(old_user + ' has been deleted successfully.')
        })
    }
}