import axios from '../config/axiosConfig'


export const setBills = (data) => {
    return {
        type: 'SET_BILLS',
        payload: data.reverse()
    }
}

export const addBill = (data) => {
    return {
        type: 'ADD_BILL',
        payload: data
    }
}

export const deleteBill = (data) => {
    return {
        type: 'DELETE_BILL',
        payload: data
    }
}

export const asyncGetBills = () => {
    return (dispatch) => {
        axios.get('/api/bills')
            .then(response => {
                const data = response.data
                dispatch(setBills(data))
            })
            .catch(err => alert(err.message))
    }
}

export const asyncAddBill = (data, history) => {
    return (dispatch) => {
        axios.post('/api/bills',data)
            .then(response => {
                const data = response.data
                dispatch(addBill(data))
                history.push(`/bills/${data._id}`)
            })
            .catch(err => alert(err.message))
    }
}

export const asyncDeleteBill = (id) => {
    return (dispatch) => {
        axios.delete(`/api/bills/${id}`)
            .then(response => {
                const data = response.data
                dispatch(deleteBill(data))
            })
            .catch(err => alert(err.message))
    }
}

export const asyncGetBillDetail = (id, handleChange) => {
    return (dispatch) => {
        axios.get(`/api/bills/${id}`)
            .then(response => {
                const data = response.data
                handleChange(data)
            })
            .catch(err => alert(err.message))
    }
}