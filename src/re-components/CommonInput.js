import React from 'react'
import {TextField,FormHelperText,Box,} from '@mui/material'
const CommonInput = (props) => {
    let {style,className,type,onChange,onBlur,value,placeholder,name,id,error,reset,accept,variant} = props
  return (
     <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <TextField
        className={className}
        style={style}
        type={type}
        label={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        accept={accept ? accept : ""}
        variant={variant}
        helperText={error}
      />
      {/* {error && <FormHelperText className="error">{error}</FormHelperText>} */}
    </Box>
  );
}
export default CommonInput