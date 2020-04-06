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
            form: {
                error: true
            },
            username: '',
            password: ''
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



    it("should have enabled login button after filling username and password", () => {
        // arrange
        const isDisabled = false

        // act
        wrapper.setState({
            username: 'user',
            password: 'password',
            form: {
                error: false
            }
        })

        const loginBtn = wrapper.find(Button)


        // assert
        expect(loginBtn.props().disabled).toEqual(isDisabled)
    })

    it("should have updated username in state when username is changed", () => {
        // arrange
        const username = 'user'

        // act
        const UsernameInput = wrapper.find(InputComponent).at(0)
        UsernameInput.props().onChange('user')

        // assert
        expect(wrapper.state().username).toEqual(username)
    })

    it("should update password in state when password is changed", () => {
        // arrange
        const password = 'password'

        // act
        const PasswordInput = wrapper.find(InputComponent).at(1)
        PasswordInput.props().onChange('password')

        // assert
        expect(wrapper.state().password).toEqual(password)
    })
})