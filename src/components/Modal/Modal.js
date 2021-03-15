import React from 'react';
import s from './Modal.modules.scss';

const Modal = props => {
    const { name, phone, order } = props.data;

    return (
        <section className={s.bg}>
            <div className={s.modal}>
                <div className={s.subject}>
                    <p>Спасибо <span>{name}</span>, ваш заказ <span>№{order}</span> оформлен.</p>
                </div>
                <div className={s.body}>
                    <p>В ближайшее время мы свяжемся с вами по телефону <span>{phone}</span> для его подтверждения.</p>
                </div>
                <a href="/" className={s.close}>&#215;</a>
            </div>
        </section>
    )
};

export default Modal;