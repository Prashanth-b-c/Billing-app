import { Button, TextField, Box, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import validator from 'validator'
import { useDispatch } from 'react-redux'
import { asyncAddCustomer, asyncUpdateCustomer } from '../../action/customerAction'

const useStyle = makeStyles({
    // form:{
    //     display:'flex',
    //     flexDirection: 'row',
    //     flexWrap: 'wrap'
    // },
    formField:{
        width: '24vw',
        marginRight: '1vw'
    },
    button: {
        display: 'flex',
        width: '13vw',
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    addBtn: {
        width: '6vw',
        height: '40px',
        marginTop: '7px'
    },
    cancelBtn: {
        width: '6vw',
        height: '40px',
        marginTop: '7px'
    }
})

const CustomerForm = (props) => {
    const { name: custName, mobile: custMobile, email: custEmail, _id, resetUpdateCust, handleClose } = props
    const [ name, setName ] = useState(custName ? custName : '')
    const [ mobile, setMobile ] = useState(custMobile ? custMobile : '')
    const [ email, setEmail ] = useState(custEmail ? custEmail : '')
    const [ formErrors, setFormErrors ] = useState({})
    const errors = {}
    const dispatch = useDispatch()
    const classes = useStyle()

    const handleChange = (e) => {
        if(e.target.name==='name') {
            setName(e.target.value)
        } else if(e.target.name==='mobile') {
            if(Number(e.target.value) || e.target.value==='') {
                if(e.target.value.length <= 10) {
                    setMobile(e.target.value)
                }
            }
        } else if(e.target.name==='email') {
            setEmail(e.target.value.split(' ').join(''))
        }
    }

    const validate = () => {
        if(name.length===0){
            errors.name = "name can't be blank"
        }
        if(mobile.length !== 10){
            errors.mobile = "enter valid mobile number"
        }
        if(!validator.isEmail(email)){
            errors.email = 'enter valid email id'
        }
        setFormErrors(errors)
    }

    const resetForm = () => {
        setName('')
        setEmail('')
        setMobile('')
        if(handleClose){
            handleClose()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validate()
        if(Object.keys(errors).length === 0){
            const formData = {
                name: name[0].toUpperCase() + name.slice(1),
                mobile: mobile,
                email: email
            }
            if(_id) {
                dispatch(asyncUpdateCustomer(_id, formData, resetUpdateCust))
            } else {
                dispatch(asyncAddCustomer(formData, resetForm, handleClose))
            }
        }
    }

    return (
            <form className={classes.form} autoComplete='off' onSubmit={handleSubmit}>
                <Box display='flex' flexDirection={handleClose ? 'column' : 'row'} flexWrap='wrap'>
                    <TextField 
                        className={classes.formField}
                        name='name'
                        label='Name'
                        value={name}
                        onChange={handleChange}
                        error={formErrors.name ? true : false}
                        helperText={formErrors.name ? formErrors.name : null}
                        variant='outlined'
                        margin='dense'
                    />
                    <TextField 
                        className={classes.formField}
                        name='mobile'
                        label='Mobile'
                        value={mobile}
                        onChange={handleChange}
                        error={formErrors.mobile ? true : false}
                        helperText={formErrors.mobile ? formErrors.mobile : null}
                        variant='outlined'
                        margin='dense'
                    />
                    <TextField 
                        className={classes.formField}
                        name='email'
                        label='Email Id'
                        value={email}
                        onChange={handleChange}
                        error={formErrors.email ? true : false}
                        helperText={formErrors.email ? formErrors.email : null}
                        variant='outlined'
                        margin='dense'
                    />
                    {
                        _id ? (
                            <div className={classes.button}>
                                <Button 
                                    className={classes.addBtn}
                                    type='submit'
                                    variant='contained' 
                                    color='primary' 
                                >
                                    update
                                </Button>
                                <Button
                                    className={classes.cancelBtn}
                                    variant='contained'
                                    color='secondary'
                                    onClick={resetUpdateCust}
                                >
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                                <div className={classes.button}>
                                    <Button 
                                        className={classes.addBtn}
                                        type='submit' 
                                        variant='contained' 
                                        color='primary'
                                    >
                                        add
                                    </Button>
                                    {
                                        (name.length>0 || email.length>0 || mobile.length>0) && (
                                            <Button 
                                                className={classes.cancelBtn}
                                                onClick = {resetForm} 
                                                variant='contained' 
                                                color='secondary'
                                            >
                                                Cancel
                                            </Button>
                                        ) 
                                    }
                                </div>
                                
                        )  
                    }
                </Box>
                
            </form>
    )
}

export default CustomerForm