import React,{useState} from 'react';

import {Typography, Paper, Avatar, Button, FormControl, Input, InputLabel} from '@material-ui/core';
import LockOutlined from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';

import firebase from '../firebase';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(1) * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(3),
    },
})

function Login(props){
    const { classes } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function onSubmit(e){
		e.preventDefault()
    }
    
    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="off" autoFocus value={email} onChange={
                            e => setEmail(e.target.value)
                        } />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input id="password" name="password" type="password" autoComplete="off" autoFocus value={password} onChange={
                            e => setPassword(e.target.value)
                        } />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onLogin}
                    >
                        Sign In
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        component={Link}
                        to="/register"
                        className={classes.submit}
                    >
                        Register
                    </Button>
                </form>
            </Paper>
        </main>
    )
    
    async function onLogin() {
        try {
            await firebase.login(email,password)

            props.history.replace('/dashboard')
        }
        catch(err) {
            alert(err.message)
        }
    }
}

export default withRouter(withStyles(styles)(Login))