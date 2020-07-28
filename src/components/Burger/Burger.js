import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.module.css';
import Spinner from '../UI/Spinner/Spinner';

const Burger = (props) => {

    React.useEffect(() => {
        //console.log('Burger');
    });
    
    let ingredients = <Spinner />

    if(props.ingredients){
        ingredients = Object.keys(props.ingredients)
                            .map(ing => { return [...Array(props.ingredients[ing])]                                                                       // An Array of size of count of ingredient
                                                .map((_willbeundefined,index) => <BurgerIngredient key={ing + index} type={ing} /> )  })                    // Key will be Unique Always
                                                .reduce((arr,el) => arr.concat(el),[]);

        if(ingredients.length === 0){
            ingredients = <p>Add Some Ingredients !!</p>
        }
    }
    
    return (
            <div className={styles.Burger}>
                <BurgerIngredient type="bread-top" />
                {ingredients}
                <BurgerIngredient type="bread-bottom" />
            </div>
    );
}

export default React.memo(Burger);