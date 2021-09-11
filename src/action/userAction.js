import axios from '../config/axiosConfig'
export const setUser = (data) => {
    return {
        type: 'SET_USER',
        payload: data
    }
}

export const asyncGetUser = () => {
    return (dispatch) => {
        axios.get('/api/users/account')
            .then(response => {
                const data = response.data
                dispatch(setUser(data))
            })
            .catch(err => alert(err.message))
    }
}