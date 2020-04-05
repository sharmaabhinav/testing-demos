import React from 'react'
import {Input} from '@material-ui/core';

const InputComponent = (props) => {
    const onChange = (event) => {
        props.onChange(event.target.value)
    }
    return (
        <Input {...props} onChange={onChange} />
    );
}

export default InputComponent;