import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectBox = ({ label, required, value, options, select }) => {
    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>{label}</InputLabel>
            <Select
                required={required} value={value}
                onChange={(e) => {
                    select(e.target.value)
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectBox