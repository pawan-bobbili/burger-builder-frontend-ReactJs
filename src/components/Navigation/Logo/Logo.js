import React from 'react'
 
import classes from './Logo.module.css'
 
import LogoImage from '../../../assets/images/burger-logo.png'
const Logo = (props) => (
    <img className={classes.Logo} src ={LogoImage} alt="burger"></img>
)
 
export default Logo