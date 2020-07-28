import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css';

const BurgerControls = (props) => {
    const burgerControls = Object.entries(props.ingredients).map(ingredient => {
        return <BuildControl key={ingredient[0]} title={ingredient[0]} quantity={ingredient[1]} dec={() => props.dec(ingredient[0])} inc={() => props.inc(ingredient[0])} />
    });
    React.useEffect(() => {
        //console.log('Build Controls');
    })
    return (
        <div className={styles.BuildControls}>
            <p><strong>Price: {props.price}</strong></p>
            {burgerControls}
            <button 
                className={styles.OrderButton}
                disabled={props.price === 0 ? true : false}
                onClick={props.purchase}
            >
                ORDER NOW
            </button>
        </div>
    );
}

export default React.memo(BurgerControls);