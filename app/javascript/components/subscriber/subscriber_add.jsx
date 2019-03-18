import React from 'react'
import Modal from '../modal'
import Alert from '../alert'

export default class SubscriberAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enable_alert: false
        }
    }

    addSubscriber = () => {
        let card_num = this.refs.card_num.value;
        let surname = this.refs.surname.value;
        let name = this.refs.name.value;
        let patronymic = this.refs.patronymic.value;
        let address = this.refs.address.value;
        let phone = this.refs.phone.value;

        if (!(card_num && surname && name && patronymic
            && address && phone)) {
            // warning alert
            this.setState({
                enable_alert: true,
                alert_type: 'warning',
                alert_message: 'Не все поля заполнены'
            });
            return;
        }

        $.ajax({
            url: "/v1/subscribers",
            type: "POST",
            data: { subscriber: { library_id: this.props.lib_id, card_num: card_num, 
                name: name, surname: surname, patronymic: patronymic, address: address, phone: phone } },
            success: (new_subscriber) => {
                this.setState({
                    enable_alert: true,
                    alert_type: 'success',
                    alert_message: 'Новая книга добавлена'
                });
                this.props.updateTable(new_subscriber);
            }
        });
    };

    render() {
        return (
            <Modal title={'Добавление нового абонента'} saveFunction={this.addSubscriber}>
                <form>
                    <div className={'form-group'}>
                        <label htmlFor={'card_num'}>Номер билета</label>
                        <input ref={'card_num'} type={'text'} className={'form-control'} id={'card_num'} placeholder={'Номер билета'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'surname'}>Фамилия</label>
                        <input ref={'surname'} type={'text'} className={'form-control'} id={'surname'} placeholder={'Фамилия'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'name'}>Имя</label>
                        <input ref={'name'} type={'text'} className={'form-control'} id={'name'} placeholder={'Имя'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'patronymic'}>Отчество</label>
                        <input ref={'patronymic'} type={'text'} className={'form-control'} id={'patronymic'} placeholder={'Отчество'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'address'}>Адрес</label>
                        <input ref={'address'} type={'text'} className={'form-control'} id={'address'} placeholder={'Адрес'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'phone'}>Телефон</label>
                        <input ref={'phone'} type={'text'} className={'form-control'} id={'phone'} placeholder={'Телефон'} required/>
                    </div>
                </form>
                {this.state.enable_alert ? <Alert type={this.state.alert_type} message={this.state.alert_message}/> : null}
            </Modal>
        )
    }
}