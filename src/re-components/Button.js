import React from 'react'
import {Button} from '@mui/material'


const CommonButton = (props) => {
  return (
    <Button
      disabled={props.disabled}
      color={props.color}
      variant={props.variant}
      style={props.style}
      onClick={props.onClick}
      type={props.type}
      className={props.className}
    >
      {props.name}
    </Button>
  );
}

export default CommonButton