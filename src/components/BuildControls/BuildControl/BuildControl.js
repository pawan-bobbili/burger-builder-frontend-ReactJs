import React from "react"

import classes from "./BuildControl.module.css"

const buildControl =(props) =>{
    // console.log(props.disable)
    return <div className = {classes.BuildControl}>
        <div>{props.label}</div>
        <button className={classes.Less} onClick = {props.removeIg} disabled={props.disable}>Less</button>
        <button className ={classes.More} onClick = {props.addIg}>More</button>
    </div>
}

export default buildControl