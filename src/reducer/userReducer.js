const initialUserState = {} 

const userReducer = (state = initialUserState, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {...action.payload}
        default:
            return state
    }
}

export default userReducer