const initialLoginState = false

const loginReducer = (state = initialLoginState, action) => {
    switch(action.type) {
        case 'SET_LOGIN':
            return true
        case 'SET_LOGOUT':
            return false
        default:
            return state
    }
}

export default loginReducer