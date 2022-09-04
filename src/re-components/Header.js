import React, { Fragment ,useState} from 'react'
import { AppBar, Tab, Tabs, Toolbar,Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import '../css/Login.css'

const Header = (props) => {
    const [value, setValue] = useState(0)
    const tabChangeHandler = (e,value)=>{
        console.log(value,"value")
        setValue(value)
    }
  return (
    <Fragment>
      <AppBar className="appBar" position={props.position}>
        <Toolbar>
          <Typography>{props.title}</Typography>
          {props.imgSrc && <img src={props.imgSrc} />}
          <Tabs className='tabs' value={value} onChange={tabChangeHandler}>
            {props.tabLinks &&
              props.tabLinks.map((link) => (
                <Tab
                  className="tab"
                  component={Link}
                  to={link.path}
                  label={link.name}
                  key={link.id}
                />
              ))}
          </Tabs>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default Header