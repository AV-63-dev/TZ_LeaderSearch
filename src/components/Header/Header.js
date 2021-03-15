import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import s from './Header.modules.scss';

import logo from './assets/lp_logo 1.png';
import BasketSvg from './assets/Vector.svg';

const Header = props => {
    const { quantity = 0 } = props;
        
    return (
        <header className={s.header}>
            <Link to={'/'}>
                <div className={s.logo}>
                    <img src={logo} alt="logo" />
                </div>
            </Link>
            { quantity 
                ? <Link to={'/basket'}>
                    <div className={cn(s.basket, s.hover)}>
                        <BasketSvg/>
                        <p>Корзина</p>
                        <div className={s.circle}>{ quantity }</div>
                    </div>
                </Link> 
                : <div className={s.basket}>
                    <BasketSvg/>
                    <p>Корзина</p>
                </div>
            }
        </header>
    )
};

export default Header;