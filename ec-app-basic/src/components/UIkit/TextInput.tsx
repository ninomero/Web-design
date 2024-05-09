import React from 'react'
import TextField from '@mui/material/TextField';

const TextInput = ({fullWidth, label, multiline, required, rows, value, type, onChange}) => {
    return (
        <TextField 
            fullWidth={fullWidth}
            label={label}
            margin="dense"
            multiline={multiline}
            required={required}
            rows={rows}
            value={value}
            type={type}
            onChange={onChange}
            variant="standard"
        />
    )
}
export default TextInput