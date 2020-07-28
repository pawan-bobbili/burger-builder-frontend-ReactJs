import React from 'react';

import styles from './DrawerToggler.module.css';

const DrawerToggler = (props) => (
    <div onClick={props.click} className={styles.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default DrawerToggler;