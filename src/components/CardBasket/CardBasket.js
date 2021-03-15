import React from 'react';
import s from './CardBasket.modules.scss';

const CardBasket = props => {
    const { card: {img, name, price, quantity, id}, func } = props;    
    
    return (
        <div className={s.card}>
            <div className={s.img} style={{ backgroundImage: `url(${img})` }}></div>
            <div className={s.name}>
                <p>{name}</p>
            </div>
            <div className={s.quantity}>
                <div className={s.minus} onClick={func} data-id={id} data-click="minus">&#8722;</div>
                <div  className={s.quantityBox}>{ quantity }</div>
                <div className={s.plus} onClick={func} data-id={id} data-click="plus">&#43;</div>
            </div>
            <div className={s.price}>
                <p>{price}</p>
            </div>
            <div className={s.close} onClick={func} data-id={id} data-click="clear">&#215;</div>
        </div>
    )
}

export default CardBasket;