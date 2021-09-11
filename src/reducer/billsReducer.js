const initialBillsState = []

const billsReducer = (state = initialBillsState, action) => {
    switch(action.type) {
        case 'SET_BILLS':
            return [...action.payload]
        case 'ADD_BILL':
            return [action.payload, ...state]
        case 'DELETE_BILL':
            return state.filter(bill => bill._id !== action.payload._id)
        default:
            return state
    }
}

export default billsReducer