import React from "react";
import {render, fireEvent, waitForElement} from '@testing-library/react'
import LoginForm from "../form"


describe("LoginForm", () => {

    let loginForm

    beforeEach(() => {
        loginForm = render(<LoginForm />)
    })

    it("should render empty initially", () => {
        // arrange
        const expectedUsername = ""
        const expeectedPassword = ""

        // act
        const { getByLabelText } = loginForm
        const userName = getByLabelText(/username/i)
        const password = getByLabelText(/password/i)


        // assert
        expect(userName.value).toEqual(expectedUsername)
        expect(password.value).toEqual(expeectedPassword)
    })

    it("should have login button disabled", () => {

        // act
        const {getByText} = loginForm
        const loginBtn = getByText(/login/i).closest('button')

        // assert
        expect(loginBtn).toBeDisabled()
    })

    it("should show error for username when user changes the username to empty", async () => {
        // arrange

        // act
        const { getByLabelText, getByText} = loginForm
        const userName = getByLabelText(/username/i)

        fireEvent.change(userName, {target: {value: 'username'} })
        fireEvent.change(userName, {target: {value: ''} })

        let errorMessage = getByText(/username is empty/i)

        // assert
        expect(errorMessage).not.toBeNull()
    })

    it("should show error for password when user changes the password to empty", async () => {
        // arrange

        // act
        const { getByLabelText, getByText} = loginForm
        const password = getByLabelText(/password/i)

        fireEvent.change(password, {target: {value: 'password'} })
        fireEvent.change(password, {target: {value: ''} })

        let errorMessage = getByText(/password is empty/i)

        // assert
        expect(errorMessage).not.toBeNull()
    })

    it("should show error message on login if password is not valid", () => {
        // arrange

        // act
        const { getByLabelText, getByText, queryByText} = loginForm
        const username = getByLabelText(/username/i)
        const password = getByLabelText(/password/i)
        const loginBtn = getByText(/login/i)

        fireEvent.change(username, {target: {value: 'username'} })
        fireEvent.change(password, {target: {value: 'pass'} })
        fireEvent.click(loginBtn)

        let errorMessage = queryByText(/The password should be at least 6 characters long/i)

        // assert
        expect(errorMessage).not.toBeNull()
    })

    it("should show not error message on login if password is  valid", () => {
        // arrange

        // act
        const { getByLabelText, queryByText, getByText} = loginForm
        const username = getByLabelText(/username/i)
        const password = getByLabelText(/password/i)
        const loginBtn = getByText(/login/i)

        fireEvent.change(username, {target: {value: 'username'} })
        fireEvent.change(password, {target: {value: 'password'} })
        fireEvent.click(loginBtn)

        let errorMessage = queryByText(/The password should be at least 6 characters long/i)

        // assert
        expect(errorMessage).toBeNull()
    })
})