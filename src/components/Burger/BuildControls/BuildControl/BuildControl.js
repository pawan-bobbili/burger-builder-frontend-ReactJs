import React from 'react';
import styles from './BuidControl.module.css';

const BuildControl = (props) => (
    <div className={styles.BuildControl}>
        <div className={styles.Label} >{props.title}</div>
        <button className={styles.Less} onClick={props.dec}>-</button>
        <p>{props.quantity} Pieces</p>
        <button className={styles.More} onClick={props.inc}>+</button>
    </div>
)

export default BuildControl;