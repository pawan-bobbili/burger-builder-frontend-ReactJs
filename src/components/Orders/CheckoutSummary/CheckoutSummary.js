import React from 'react';
import {withRouter} from 'react-router-dom';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
    //useEffect(() => console.log(props.ingredients));
    return (
        <div className={styles.CheckoutSummary}>
            <h3>Your Burger !!</h3>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button type="Danger" click={props.cancel}>CANCEL</Button>
            {/* <Link to={props.match.url + '/contact-data'} >Proceed</Link>    Same Behaviour*/}
            <Button type="Success" click={props.proceed}>PROCEED</Button>
        </div>
    )
}

export default withRouter(CheckoutSummary);