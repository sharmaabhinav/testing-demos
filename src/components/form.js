import React, {useState, Component} from "react"
import { Button } from '@material-ui/core';

import Input from "./lib/input"

class LoginForm  extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            form: {error: true}
        }
    }

    onPasswordChange = (value) => {
        const isFormError = !value || !this.state.username
        this.setState({
            password: value,
            form: {error: isFormError}
        })
    }

    onUserNameChange = (value) => {
        const isFormError = !value || !this.state.password
        this.setState({
            username: value,
            form: {error: isFormError}
        })

    }

    render () {
        return (
        <form className="login-form">
            <Input placeholder='Username' onChange={this.onUserNameChange} value={this.state.username} />
            <Input placeholder='Password' onChange={this.onPasswordChange} value={this.state.password} />
            <Button color="primary" variant="contained" disabled={this.state.form.error}>Login</Button>
        </form>
    );
    }
}

export default LoginForm;


