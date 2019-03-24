import React from 'react'
import Modal from '../modal'

export default class SubscriberForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_id: 'modal_subscriber',
            form_id: 'form_subscriber'
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let subscriber = {
            card_num: this.card_num.value,
            surname: this.surname.value,
            name: this.name.value,
            patronymic: this.patronymic.value,
            address: this.address.value,
            phone: '7' + this.phone.value.replace(/ /g, '')
        }  

        document.getElementById(this.state.form_id).reset();

        if (this.props.edit_subscriber) {
            this.props.updateTableEdit(this.props.edit_subscriber.id, subscriber);
        } else {
            this.props.updateTableAdd(subscriber);
        }
    };

    render() {
        let {card_num = '', surname = '', name = '', patronymic = '', address = '', phone = ''} = this.props.edit_subscriber || {};
        return (
            <Modal enable={this.props.modal} title={this.props.edit_subscriber ? 'Изменение абонента' : 'Добавление нового абонента'} modal_id={this.state.modal_id} form_id={this.state.form_id}>
                <form id={this.state.form_id} onSubmit={() => this.handleSubmit(event)}>
                    <div className={'form-group'}>
                        <label htmlFor={'card_num'}>Номер билета</label>
                        <input ref={el => this.card_num = el} defaultValue={card_num} type={'number'} className={'form-control'} id={'card_num'} min={'0'} step={'1'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'surname'}>Фамилия</label>
                        <input ref={el => this.surname = el} defaultValue={surname} type={'text'} className={'form-control'} id={'surname'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'name'}>Имя</label>
                        <input ref={el => this.name = el} defaultValue={name} type={'text'} className={'form-control'} id={'name'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'patronymic'}>Отчество</label>
                        <input ref={el => this.patronymic = el} defaultValue={patronymic} type={'text'} className={'form-control'} id={'patronymic'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'address'}>Адрес</label>
                        <input ref={el => this.address = el} defaultValue={address} type={'text'} className={'form-control'} id={'address'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'phone'}>Телефон</label>
                        <div className={'input-group mb-2 mr-sm-2'}>
                            <div className={'input-group-prepend'}>
                                <div className={'input-group-text'}>+7</div>
                            </div>
                            <input ref={el => this.phone = el} defaultValue={phone.toString().substring(1, 11)} type={'tel'} className={'form-control'} id={'phone'}
                                pattern={'[0-9]{10}'} placeholder={'XXXXXXXXXX'} required onChange={this.handlePhoneInput}/>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}