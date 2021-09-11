import { Container, Typography, Box, makeStyles} from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

const useStyle = makeStyles({
    title: {
        fontWeight: '600'
    },
    keys:{
        fontWeight:'700'
    }
})

const UserPage = (props) => {
    const userDetails = useSelector(state => state.user)
    // const dispatch = useDispatch()
    const classes = useStyle()
    
    // useEffect(() => {
    //     dispatch(asyncGetUser())
    // }, [])

    return (
        <Container maxWidth='sm'>
            <Box>
                <Typography className={classes.title} variant='h3' align='center'>User Profile</Typography>
            </Box>
            <Box display='flex' flexDirection='row' justifyContent='space-evenly' alignItems='center' height='70vh'>
                <Box>
                    <Typography className={classes.keys} variant='h5'>Name: </Typography>
                    <Typography className={classes.keys} variant='h5'>Email: </Typography>
                    <Typography className={classes.keys} variant='h5'>Business Name: </Typography>
                    <Typography className={classes.keys} variant='h5'>Address: </Typography>
                </Box>
                <Box>
                    <Typography variant='h5'>{userDetails.username}</Typography>
                    <Typography variant='h5'>{userDetails.email}</Typography>
                    <Typography variant='h5'>{userDetails.businessName}</Typography>
                    <Typography variant='h5'>{userDetails.address}</Typography>
                </Box>
                    
            </Box>            
        </Container>
    )
}

export default UserPage