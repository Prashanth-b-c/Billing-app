import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = (props) => {
    const isLogin = localStorage.getItem('token')
    const { component: Component, exact, path } = props

    return (
            <Route path={path} render={(props) => {
                return isLogin ? <Component {...props} /> : <Redirect to='/login-or-register' />
            }} exact={exact} />
    )
}

export default PrivateRoute