import React, { useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLogin } from '../../action/loginAction'
import HomePage from '../HomePage/HomePage'
import LoginRegisterPage from '../HomePage/LoginRegisterPage'
import Drawer from './Drawer'
import AppBar from './AppBar'
import UserPage from '../UserPage/UserPage'
import CustomerPage from '../CustomerPage/CustomerPage'
import ProductPage from '../ProductPage/ProductPage'
import BillsPage from '../BillsPage/BillsPage'
import AddBill from '../BillsPage/Generate New Bill/AddBill'
import ViewCustomer from '../CustomerPage/View Customer/ViewCustomer'
import BillView from '../BillsPage/View Bill/BillView'
import Dashboard from '../Dashboard/Dashboard'
import PrivateRoute from './PrivateRoute'

const NavBar = (props) => {
    const isLoggedIn = useSelector(state => state.login)
    const dispatch = useDispatch()

    useEffect(() => {
        if(localStorage.getItem('token')){
            dispatch(setLogin())
            // props.history.push('/dashboard')
        }
    }, [dispatch, props.history, isLoggedIn])

    return(
        <div>
            {
                isLoggedIn ? (
                    <Drawer />
                ) : (
                    <AppBar />
                )
            }

            <Route path='/' component={HomePage} exact={true} />
            <Route path='/login-or-register' component={LoginRegisterPage} />

            <PrivateRoute path='/user' component={UserPage} exact={true} />
            <PrivateRoute path='/customers' component={CustomerPage} exact={true} />
            <PrivateRoute path='/products' component={ProductPage} exact={true} />
            <PrivateRoute path='/bills' component={BillsPage} exact={true} />
            <PrivateRoute path='/addBill' component={AddBill} exact={true} />
            <PrivateRoute path='/customers/:id' component={ViewCustomer} exact={true} />
            <PrivateRoute path='/bills/:id' component={BillView} exact={true} />
            <PrivateRoute path='/dashboard' component={Dashboard} exact={true} />
        </div>
    )
}

export default withRouter(NavBar)