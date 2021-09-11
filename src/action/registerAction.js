import axios from '../config/axiosConfig'

export const asyncRegister = (data, changeTab, notify) => {
    return (dispatch) => {
        axios.post('/api/users/register', data) 
            .then(response => {
                const data = response.data
                console.log(data)
                if(!data.errors) {
                    changeTab('login')
                }
            })
            .catch(err => alert(err.message))
    }
}