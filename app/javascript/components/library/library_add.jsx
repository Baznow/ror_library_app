import React from 'react'
import Modal from '../modal'
import Alert from '../alert'

export default class LibraryAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enable_alert: false
        }
    }

    saveNewLibrary = () => {
        let number = this.refs.lib_num.value;
        let name = this.refs.lib_name.value;
        let address = this.refs.lib_address.value;

        if (!(number && name && address)) {
            // warning alert
            this.setState({
                enable_alert: true,
                alert_type: 'warning',
                alert_message: 'Не все поля заполнены'
            });
            return;
        }

        $.ajax({
            url: "/v1/libraries",
            type: "POST",
            data: { library: { number: number, name: name, address: address } },
            success: (new_library) => {
                this.setState({
                    enable_alert: true,
                    alert_type: 'success',
                    alert_message: 'Новая библиотека добавлена'
                });
                this.props.updateTable(new_library);
            }
        });


    };

    render() {
        return (
            <Modal title={'Добавление новой библиотеки'} saveFunction={this.saveNewLibrary}>
                <form>
                    <div className={'form-group'}>
                        <label htmlFor={'lib_num'}>Номер</label>
                        <input ref={'lib_num'} type={'text'} className={'form-control'} id={'lib_num'} placeholder={'Номер библиотеки'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'lib_name'}>Название</label>
                        <input ref={'lib_name'} type={'text'} className={'form-control'} id={'lib_name'} placeholder={'Наименование библиотеки'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'lib_address'}>Адрес</label>
                        <input ref={'lib_address'} type={'text'} className={'form-control'} id={'lib_address'} placeholder={'Адрес'} required/>
                    </div>
                </form>
                {this.state.enable_alert ? <Alert type={this.state.alert_type} message={this.state.alert_message}/> : null}
            </Modal>
        )
    }
}