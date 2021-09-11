import { Box, Button, Grid, TextField, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import validator from 'validator'
import { asyncLogin } from '../../action/loginAction'

const useStyle = makeStyles({
    formElements: {
        marginTop: '15px'
    }
})

const LoginForm = (props) => {  
    const { handleErrorNotify } = props
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ formErrors, setFormErrors ] = useState({})
    const errors = {}
    const classes = useStyle()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        if(e.target.name === 'email') {
            setEmail(e.target.value.split(' ').join(''))
        } else if(e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    const validation = () => {
        if(!validator.isEmail(email)) {
            errors.email = 'enter valid email id'
        }
        if(password.length===0) {
            errors.password = 'enter valid password'
        } else if(password.length < 8) {
            errors.password = 'password must be above 8 characters'
        }
        setFormErrors(errors)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validation()
        if(Object.keys(errors).length === 0) {
            const formData = {
                email: email,
                password: password
            }
            dispatch(asyncLogin(formData, props.history, handleErrorNotify))
            console.log(formData)
        }
    }

    return (
        <Grid container justify='center'>
            <Box display='block' width={320}>
                <Typography variant='h6'>Enter your credentials to login</Typography>
                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <TextField 
                        variant='outlined'
                        margin='dense'
                        name='email'
                        label='Email ID' 
                        value={email} 
                        onChange={handleChange} 
                        fullWidth 
                        helperText={formErrors.email ? formErrors.email : null}
                        error={formErrors.email ? true : false}
                    /> <br />
                    <TextField 
                        variant='outlined'
                        margin='dense'
                        className={classes.formElements}
                        name='password'
                        label='Password' 
                        value={password} 
                        onChange={handleChange} 
                        fullWidth 
                        helperText={formErrors.password ? formErrors.password : null}
                        error={formErrors.password ? true : false}
                        type='password'
                    />
                    <Box>
                        <Box display='flex' flexDirection='row' justifyContent='flex-end'>
                            <Button 
                                className={classes.formElements} 
                                type='submit' 
                                color='primary' 
                                variant='contained'
                            >
                                Login
                            </Button>
                        </Box>
                    </Box>
                    
                </form>
            </Box>
        </Grid>
    )
}

export default LoginForm