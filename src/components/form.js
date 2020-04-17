import React, {Component} from "react"
import { Button, FormHelperText } from '@material-ui/core';

import Input from "./lib/input"

class LoginForm  extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: {value: '', error: true, message: 'Username is empty'},
            password: {value: '', error: true, message: 'Password is empty'},
            error: false,
            errorMessage: '',
            isLoginEnabled: false
        }
    }

    onPasswordChange = (value) => {
        const error = value === ''
        const message = error ? 'Password is empty' : ''

        this.setState({
            password: {value, error, message},
            isLoginEnabled: !this.state.username.error && !error
        })
    }

    onUserNameChange = (value) => {
        const error = value === ''
        const message = error ? 'Username is empty' : ''

        this.setState({
            username: {value, error, message},
            isLoginEnabled: !error && !this.state.password.error
        })
    }

    onLogin = () => {
        const error = this.state.password.value.length < 6
        const errorMessage = error ? 'The password should be at least 6 characters long' : ''
        this.setState({
            error,
            errorMessage
        })
    }

    render () {
        return (
        <>
        <FormHelperText id='form-error-text' error={this.state.error} >{this.state.errorMessage}</FormHelperText>
        <form className="login-form">
            <Input name="username" inputErrorDetails={this.state.username} id="username" label="Username" placeholder='Username' onChange={this.onUserNameChange} value={this.state.username.value} />
            <Input name="password" inputErrorDetails={this.state.password} id="password" label="Password"  placeholder='Password' onChange={this.onPasswordChange} value={this.state.password.value} />
            <Button color="primary" variant="contained" disabled={!this.state.isLoginEnabled} onClick={this.onLogin} >Login</Button>
        </form>
        </>
    );
    }
}

export default LoginForm;


