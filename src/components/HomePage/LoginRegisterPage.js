import React, { useState } from 'react'
import { Paper, Tab, Container, makeStyles, Box, Zoom } from '@material-ui/core'
import { TabPanel, TabContext, TabList } from '@material-ui/lab'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const useStyle = makeStyles({
    tabs: {
        position: 'relative',
        marginTop: '110px'
    },
    tabName: {
        fontWeight: 'bolder'
    }
})

const LoginRegisterPage = (props) => {
    const [ value, setValue ] = useState('login')
    const [ errorNotify, setErrorNotify ] = useState({ error: false, errorMessage: ''})
    const classes = useStyle()

    const handleChangeTabValue = (tabName) => {
        setValue(tabName)
    } 

    const handleErrorNotify = (value) => {
        setErrorNotify(value)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Box className='loginPage'>
            {errorNotify.error === true && (
                <div className='errorMessage'> 
                    <p>{errorNotify.errorMessage}</p> 
                    <button onClick={() => handleErrorNotify({error:false, errorMessage:''})}>X</button> 
                </div>
            )} 
            <Zoom in timeout={700}>
                <Container className={classes.tabs} maxWidth={'sm'}>
                    <Paper>
                        <TabContext value={value}>
                        <TabList
                            value={value}
                            onChange = {handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant='fullWidth'
                        >
                            <Tab className={classes.tabName} label='Login' value={'login'} />
                            <Tab className={classes.tabName} label='Register' value={'register'} />
                        </TabList>
                            <TabPanel value={'login'}>
                                <LoginForm handleErrorNotify={handleErrorNotify} {...props} />
                            </TabPanel>
                            <TabPanel value={'register'}>
                                <RegisterForm handleChangeTabValue={handleChangeTabValue} />
                            </TabPanel>
                        </TabContext>
                    </Paper>
                </Container>
            </Zoom> 
        </Box>
    )
}

export default LoginRegisterPage