import React from 'react'
import Modal from '../modal'

export default class LibraryAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_id: 'modal_library',
            form_id: 'form_library'
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let library = {
            number: this.number.value, 
            name: this.name.value, 
            address: this.address.value
        }

        document.getElementById(this.state.form_id).reset();

        if (this.props.edit_library) {
            this.props.updateTableEdit(this.props.edit_library.id, library);
        } else {
            this.props.updateTableAdd(library);
        }
    };

    render() {
        let {number = '', name = '', address = '' } = this.props.edit_library || {};
        return (
            <Modal enable={this.props.modal} title={this.props.edit_library ? 'Редактирование библиотеки' : 'Добавление новой библиотеки'} modal_id={this.state.modal_id} form_id={this.state.form_id}>
                <form id={this.state.form_id} onSubmit={() => this.handleSubmit(event)}>
                    <div className={'form-group'}>
                        <label htmlFor={'lib_num'}>Номер</label>
                        <input ref={el => this.number = el} defaultValue={number} type={'text'} className={'form-control'} id={'lib_num'} placeholder={'Номер библиотеки'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'lib_name'}>Название</label>
                        <input ref={el => this.name = el} type={'text'} defaultValue={name} className={'form-control'} id={'lib_name'} placeholder={'Наименование библиотеки'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'lib_address'}>Адрес</label>
                        <input ref={el => this.address = el} type={'text'} defaultValue={address} className={'form-control'} id={'lib_address'} required/>
                    </div>
                </form>
            </Modal>
        )
    }
}