import React from 'react';
import cn from 'classnames';
import s from './Card.modules.scss';

const Card = props => {
    const { card: {img, name, price, click, id}, func } = props;    
    
    return (
        <div className={s.card}>
            <img className={s.img} src={`${img}`} alt="product photo"/>
            <div className={s.name}>
                <p>{name}</p>
            </div>
            <div className={s.price}>
                <p>{price}</p>
            </div>
            { !click 
                ? <button className={s.btn} onClick={event => func(event)} data-id={id}>ДОБАВИТЬ В КОРЗИНУ</button> 
                : <button className={cn(s.btn, s.click)} data-id={id}>В КОРЗИНЕ</button> }
        </div>
    )
}

export default Card;