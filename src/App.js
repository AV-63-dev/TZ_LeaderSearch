import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './page/Home/Home';
import Basket from './page/Basket/Basket';

import data from './data';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            goods: data.concat(),
        };

        this.clickHome = this.clickHome.bind(this);
        this.clickBasket = this.clickBasket.bind(this);
    }

    clickHome(event) {
        const state = this.state.goods.concat();
        const id = event.target.dataset.id;
        state.forEach(item => {
            if (item.id === id) {
                item.click = true;
                item.quantity = 1;
            }
        });
        this.setState({ goods: state });
    }

    clickBasket(event) {
        const state = this.state.goods.concat();
        const id = event.target.dataset.id;
        const action = event.target.dataset.click;
        state.forEach(item => {
            if (item.id === id) {
                if (action === "clear") {
                    item.click = false;
                    item.quantity = 0;
                } else {
                    if (action === "minus" && item.quantity > 1) item.quantity--;
                    if (action === "plus" && item.quantity < 10) item.quantity++;
                }
            }
        });
        this.setState({ goods: state });
    }

    render() {
        return (
            <BrowserRouter>
                <Route path="/" exact>
                    <Home cards={this.state.goods} func={this.clickHome} />
                </Route>
                <Route path="/basket">
                    <Basket cards={this.state.goods} func={this.clickBasket}/>
                </Route>                
            </BrowserRouter>
        )
    }

}

export default App;