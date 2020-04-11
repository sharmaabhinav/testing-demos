import React from "react";
import {shallow} from "enzyme"
import LoginForm from "../form"
import InputComponent from "../lib/input"
import { Button } from '@material-ui/core';


describe('LoginForm', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<LoginForm />)
    })

    it("should render", () => {
        expect(wrapper).toMatchSnapshot()
    })

    it("should render with correct initial state", () => {
        // arrange
        const expectedInitialState = {
           username: {value: '', error: true, message: ''},
            password: {value: '', error: true, message: ''},
            error: false,
            errorMessage: '',
            isLoginEnabled: false
        }

        // act
        const state = wrapper.state()

        // assert
        expect(state).toEqual(expectedInitialState)
    })

    it("should have disabled login button initially", () => {
        // arrange
        const isDisabled = true

        // act
        const loginBtn = wrapper.find(Button)

        // assert
        expect(loginBtn.props().disabled).toEqual(isDisabled)
    })

    it("should have updated username in state when username is changed", () => {
        // arrange
        const username = {value: 'user', error: false, message: ''}

        // act
        const UsernameInput = wrapper.find(InputComponent).at(0)
        UsernameInput.props().onChange('user')

        // assert
        expect(wrapper.state().username).toEqual(username)
    })

    it("should update password in state when password is changed", () => {
        // arrange
        const password = {value: 'password', error: false, message: ''}

        // act
        const PasswordInput = wrapper.find(InputComponent).at(1)
        PasswordInput.props().onChange('password')

        // assert
        expect(wrapper.state().password).toEqual(password)
    })

    it("should have enabled login button after filling username and password", () => {
        // arrange
        const isDisabled = false

        // act
        const UsernameInput = wrapper.find(InputComponent).at(0)
        const PasswordInput = wrapper.find(InputComponent).at(1)

        UsernameInput.props().onChange('user')
        PasswordInput.props().onChange('password')

        const loginBtn = wrapper.find(Button)

        // assert
        expect(loginBtn.props().disabled).toEqual(isDisabled)
    })

    it("should show error on login if password is not valid", () => {

        // act
        const UsernameInput = wrapper.find(InputComponent).at(0)
        const PasswordInput = wrapper.find(InputComponent).at(1)

        UsernameInput.props().onChange('user')
        PasswordInput.props().onChange('pass')

        const loginBtn = wrapper.find(Button)
        loginBtn.props().onClick()

        // assert
        expect(wrapper.state().error).toEqual(true)
        expect(wrapper.state().errorMessage).toEqual("The password should be at least 6 characters long")
    })
})