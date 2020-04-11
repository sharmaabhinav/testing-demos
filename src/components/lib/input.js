import React from 'react'
import {FormControl, OutlinedInput, InputLabel, FormHelperText} from '@material-ui/core';

const InputComponent = (props) => {
    const {label, onChange, inputErrorDetails, ...inputProps} = props
    const onInputChange = (event) => {
        props.onChange(event.target.value)
    }
    return (
        <FormControl variant="outlined" error={inputErrorDetails.error}>
            <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
            <OutlinedInput {...inputProps} onChange={onInputChange} /> 
            <FormHelperText id={`${props.id}-error-text`}>{inputErrorDetails.message}</FormHelperText>   
        </FormControl>
    );
}

export default InputComponent;