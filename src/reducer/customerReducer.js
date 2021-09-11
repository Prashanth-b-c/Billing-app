const initialCustomerState = []

const customerReducer = (state = initialCustomerState, action) => {
    switch(action.type) {
        case 'SET_CUSTOMERS':
            return [...action.payload]
        case 'ADD_CUSTOMER':
            return [...state, action.payload]
        case 'DELETE_CUSTOMER':
            return state.filter(cust => cust._id !== action.payload._id)
        case 'UPDATE_CUSTOMER':
            const data = action.payload
            return state.map(cust => {
                if(data._id === cust._id){
                    return data
                } else {
                    return cust
                }
            })
        default: 
            return state
    }
}

export default customerReducer