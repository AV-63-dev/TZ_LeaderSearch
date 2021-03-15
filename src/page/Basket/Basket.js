import React from 'react';
import {Redirect} from 'react-router-dom';
import s from './Basket.modules.scss';


import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CardBasket from '../../components/CardBasket/CardBasket';
import Form from '../../components/Form/Form';

import { sorter } from '../../utils';

const Basket = props => {
    const { cards, func } = props;
    const total = sorter(cards).reduce((sum, current) => sum + current.quantity * parseInt(current.price.replace(/[^\d]/g, '')), 0);
    if (!total) return <Redirect to="/" />;

    return (
        <React.Fragment>
            <Header quantity={sorter(cards).length}/>
            <section className={s.section}>
                <div className={s.title}>
                    <h1>Корзина</h1>
                </div>
                <div className={s.cards}>
                    {sorter(cards).map(item => (
                        <React.Fragment key={item.id}>
                            <CardBasket card={item} func={func}/>
                            <hr/>
                        </React.Fragment>
                    ))}
                </div>
                <div className={s.total}>{`Сумма ${total} ₽`}</div>
            </section>
            <Form/>
            <Footer/>
        </React.Fragment>
    )
};

export default Basket;