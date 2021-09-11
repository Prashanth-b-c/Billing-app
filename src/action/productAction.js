import axios from '../config/axiosConfig'



export const setProducts = (data) => {
    return {
        type: 'SET_PRODUCTS',
        payload: data
    }
}

export const addProduct = (data) => {
    return {
        type: 'ADD_PRODUCT',
        payload: data
    }
}

export const updateProduct = (data) => {
    return {
        type: 'UPDATE_PRODUCT',
        payload: data
    }
}

export const deleteProduct = (data) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: data
    }
}

export const asyncGetProducts = () => {
    return (dispatch) => {
        axios.get('/api/products')
            .then(response => {
                const data = response.data
                dispatch(setProducts(data))
            })
            .catch(err => alert(err.message))
    }
}

export const asyncAddProducts = (data, reset) => {
    return (dispatch) => {
        axios.post('/api/products', data)
            .then(response => {
                const data = response.data
                dispatch(addProduct(data))
                reset()
            })
            .catch(err => alert(err.message))
    }
}

export const asyncUpdateProducts = (id, data, reset) => {
    return (dispatch) => {
        axios.put(`/api/products/${id}`, data)
            .then(response => {
                const data = response.data
                dispatch(updateProduct(data))
                reset()
            })
            .catch(err => alert(err.message))
    }
}

export const asyncDeleteProducts = (id) => {
    return (dispatch) => {
        axios.delete(`/api/products/${id}`)
            .then(response => {
                const data = response.data
                dispatch(deleteProduct(data))
            })
            .catch(err => alert(err.message))
    }
}

export const asyncProductDetail = (id, stateChange) => {
    return (dispatch) => {
        axios.get(`/api/products/${id}`)
            .then(response => {
                const data = response.data
                stateChange(data)
            })
            .catch(err => alert(err.message))
    }
}