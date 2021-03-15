import React from 'react';
import s from './Home.modules.scss';

import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { sorter } from '../../utils';

const Home = props => {
    const { cards, func } = props;


    return (
        <React.Fragment>
            <Header quantity={sorter(cards).length}/>
            <section className={s.section}>
                <div className={s.title}>
                    <h1>Каталог товаров</h1>
                </div>
                <div className={s.cards}>
                    {cards.map(item => <Card card={item} func={func} key={item.id}/>)}
                </div>
            </section>
            <Footer/>
        </React.Fragment>
    )
};

export default Home;