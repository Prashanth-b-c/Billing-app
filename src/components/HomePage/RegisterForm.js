import React, { useState } from 'react'
import { Box, Grid, TextField, Typography, Button, makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import validator from 'validator'
import { asyncRegister } from '../../action/registerAction'

const useStyle = makeStyles({
    formElements: {
        marginTop: '15px'
    }
})

const RegisterForm = (props) => {
    const { handleChangeTabValue } = props
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ businessName, setBusinessName ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ formErrors, setFormErrors ] = useState({})
    const errors = {}
    const classes = useStyle()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        if(e.target.name==='username') {
            setUsername(e.target.value)
        } else if(e.target.name==='email') {
            setEmail(e.target.value.split(' ').join(''))
        } else if(e.target.name==='password') {
            setPassword(e.target.value)
        } else if(e.target.name==='businessName') {
            setBusinessName(e.target.value)
        } else if(e.target.name==='address') {
            setAddress(e.target.value)
        }
    }

    const validation = () => {
        if(username.length === 0) {
            errors.username = "username can't be blank"
        }
        if(!validator.isEmail(email)) {
            errors.email = "enter valid email id"
        }
        if(password.length < 8) {
            errors.password = "password length must be greater than 8"
        }
        if(businessName.length === 0) {
            errors.businessName = "business name can't be blank"
        }
        if(address.length === 0) {
            errors.address = "address can't be blank"
        }
        setFormErrors(errors)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validation()
        if(Object.keys(errors).length === 0) {
            const formData = {
                username: username[0].toUpperCase() + username.slice(1),
                email: email,
                password: password,
                businessName: businessName,
                address: address
            }
            dispatch(asyncRegister(formData, handleChangeTabValue ))
        }
    }

    return (
        <Grid container justify='center'>
            <Box display='block' width={350}>
                <Typography variant='h6'>Fill in the details to register</Typography>
                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <TextField
                        margin='dense'
                        variant='outlined'
                        name='username'
                        label='Username'
                        value={username}
                        onChange={handleChange}
                        fullWidth
                        helperText={formErrors.username ? formErrors.username : null}
                        error={formErrors.username ? true : false}
                        required
                    /> <br />
                    <TextField
                        className={classes.formElements}
                        variant='outlined'
                        margin='dense'
                        name='email'
                        label='Email Id'
                        value={email}
                        onChange={handleChange}
                        fullWidth
                        helperText={formErrors.email ? formErrors.email : null}
                        error={formErrors.email ? true : false}
                        required
                    /> <br />
                    <TextField
                        className={classes.formElements}
                        variant='outlined'
                        margin='dense'
                        type='password'
                        name='password'
                        label='Password'
                        value={password}
                        onChange={handleChange}
                        fullWidth
                        helperText={formErrors.password ? formErrors.password : null}
                        error={formErrors.password ? true : false}
                        required
                    /> <br />
                    <TextField
                        className={classes.formElements}
                        variant='outlined'
                        margin='dense'
                        name='businessName'
                        label='Business Name'
                        value={businessName}
                        onChange={handleChange}
                        fullWidth
                        helperText={formErrors.businessName ? formErrors.businessName : null}
                        error={formErrors.businessName ? true : false}
                        required
                    /> <br />
                    <TextField
                        className={classes.formElements}
                        variant='outlined'
                        margin='dense'
                        name='address'
                        label='Address'
                        value={address}
                        onChange={handleChange}
                        multiline = {true}
                        rows={4}
                        fullWidth
                        helperText={formErrors.address ? formErrors.address : null}
                        error={formErrors.address ? true : false}
                        required
                    /> <br />
                    <Box display='flex' flexDirection='row' justifyContent='flex-end'>
                        <Button 
                            className={classes.formElements}
                            type='submit'
                            variant='contained'
                            color='primary'
                        >
                            Register
                        </Button>
                    </Box>
                    
                </form>
            </Box>
        </Grid>
    )
}

export default RegisterForm