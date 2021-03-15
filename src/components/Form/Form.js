import React, { Component } from 'react';
import cn from 'classnames';
import regeneratorRuntime from "regenerator-runtime";

import s from './Form.modules.scss';
import { random, send } from '../../utils';

import Modal from '../../components/Modal/Modal';

class Form extends Component {
    constructor() {
        super();

        this.state = {
            valueName: '',
            valuePhone: '',
            valueEmail: '',
            validEmail: true,
        };

        this.dataOrder = {
            name: '',
            phone: '',
            order: '',
            modal: false,
        };

        this.masked = '+7(___) ___-__-__';
        
        this.handlerPhone = this.handlerPhone.bind(this);
        this.handlerEmail = this.handlerEmail.bind(this);
        this.sendForm = this.sendForm.bind(this);
        this.testValidForm = this.testValidForm.bind(this);
    };

    handlerPhone(event) {
        let value = '';
        const masked = this.masked;
        const valueMasked = masked.replace(/\D/g, "")
        if (event.type === "blur" && event.target.value === masked) {
            this.setState({valuePhone: value});
            return
        }
        value = event.target.value.replace(/\D/g, "");
		if (event.nativeEvent.inputType === "deleteContentBackward") {
            value = value.slice(0, value.length - 1);
		}
		let i = 0;
		value = masked.replace(/[_\d]/g, reg => i < value.length ? value.charAt(i++) || valueMasked.charAt(i) : reg);
        this.setState({valuePhone: value});
    }

    handlerEmail(event) {
        const value = event.target.value;
        const reg = /^[\w]{1}[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        const valid = reg.test(value);
        
        // this.setState({valueEmail: value, validEmail: valid}); // Валидация на лету

        this.setState({valueEmail: value}); // Валидация по Blur
        if (event.type === "blur" && value === "") this.setState({validEmail: true}) // Валидация по Blur
        else if (event.type === "blur") this.setState({validEmail: valid}); // Валидация по Blur
        if (event.type === "focus") this.setState({validEmail: true}); // Валидация по Blur
    }

    testValidForm() {
        let valid = false;
        const name = this.state.valueName.length;
        const valuePhone = this.state.valuePhone;
        const phone = valuePhone.replace(/\D/g, "").length;
        const reg = /^[\w]{1}[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        const email = reg.test(this.state.valueEmail);
        const send = !this.state.modal;
        if (name > 0 && phone == 11 && email && send) valid = true;
        return valid;
    }

    async sendForm(event) {
        event.preventDefault();
        if (this.testValidForm()) {
            const formData = new FormData();
            formData.append('name', this.state.valueName);
            formData.append('phone', this.state.valuePhone);
            formData.append('email', this.state.valueEmail);
            const order = random(100000, 900000);
            formData.append('order', order);
            const otvet = await send(formData);
            if (otvet === "not sent") alert('ERROR php => smtp');
            if (otvet === "sent") {
                this.dataOrder = {
                    name: this.state.valueName,
                    phone: this.state.valuePhone,
                    order: order,
                    modal: true,
                };
                this.setState({
                    valueName: '',
                    valuePhone: '',
                    valueEmail: '',
                });
            };
        };
    }


    render() {
        let btnActive = false;
        btnActive = this.testValidForm();

        return (
            <form className={s.form} onSubmit={this.sendForm}>
                <div className={s.text}>
                    <p>Пожалуйста, представьтесь</p>
                </div>
                <input className={s.name} type="text" value={this.state.valueName} placeholder="Ваше имя" onChange={event => this.setState({valueName: event.target.value})}/>
                <input className={s.phone} type="text" value={this.state.valuePhone} placeholder="Телефон" onChange={this.handlerPhone} onFocus={this.handlerPhone} onBlur={this.handlerPhone}/>
                <input className={cn(s.email, this.state.validEmail ? null : s.error)} type="text" value={this.state.valueEmail} placeholder="Email" onChange={this.handlerEmail} onFocus={this.handlerEmail} onBlur={this.handlerEmail}/>
                { this.state.validEmail ? <div className={s.noValidEmail}/> : <div className={s.noValidEmail}>Поле заполнено неверно</div>}
                { btnActive 
                    ? <button className={cn(s.btn, s.active)} >ОФОРМИТЬ ЗАКАЗ</button> 
                    : <button className={s.btn}>ОФОРМИТЬ ЗАКАЗ</button>}
                { this.dataOrder.modal ? <Modal data={this.dataOrder} /> : null}
            </form>
        )
    }
    
}

export default Form;