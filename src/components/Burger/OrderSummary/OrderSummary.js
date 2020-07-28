import React from 'react';

import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
    const ingredientslist = Object.keys(props.ingredients).map(ing => {
        return (
            <li key={ing}>
                <span style={{textTransform:'capitalize'}}>{ing}</span>: {props.ingredients[ing]}
            </li>
        )
    });
    React.useEffect(() => {
        //console.log('Order Summary');
    })
    return (
        <Auxilary>
            <h3>Your Order</h3>
            <p>A Great Burger with following ingredients..</p>
            <ul>
                {ingredientslist}
            </ul>
            <p><strong>Total Amount: {props.totalprice}</strong></p>
            <Button type="Danger" click={props.cancel}>CANCEL</Button>
            <Button type="Success" click={props.continue}>CONTINUE</Button>
        </Auxilary>
    )
}

export default React.memo(OrderSummary,(prevProps, nextProps) => !nextProps.show);