import React from 'react'
import Modal from '../modal'

export default class EmployeeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_id: 'modal_employee',
            form_id: 'form_employee'
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let employee = {
            surname: this.surname.value, 
            name: this.name.value, 
            patronymic: this.patronymic.value,
            birthday: this.birthday.value, 
            employ_date: this.employ_date.value, 
            position: this.position.value, 
            education: this.education.value 
        }

        document.getElementById(this.state.form_id).reset();

        if (this.props.edit_employee) {
            this.props.updateTableEdit(this.props.edit_employee.id, employee);
        } else {
            this.props.updateTableAdd(employee);
        }
    };

    render() {
        let {surname = '', name = '', patronymic = '', birthday = '', employ_date = '', position = '', education = '' } = this.props.edit_employee || {};
        return (
            <Modal enable={this.props.modal} title={this.props.edit_employee ? 'Редактирование сотрудника' : 'Добавление нового сотрудника'} modal_id={this.state.modal_id} form_id={this.state.form_id}>
                <form id={this.state.form_id} onSubmit={() => this.handleSubmit(event)}>
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
                        <label htmlFor={'birthday'}>Дата рождения</label>
                        <input ref={el => this.birthday = el} defaultValue={birthday} type={'date'} className={'form-control'} id={'birthday'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'employ_date'}>Дата принятия на работу</label>
                        <input ref={el => this.employ_date = el} defaultValue={employ_date} type={'date'} className={'form-control'} id={'employ_date'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'position'}>Должность</label>
                        <input ref={el => this.position = el} defaultValue={position} type={'text'} className={'form-control'} id={'position'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'education'}>Образование</label>
                        <input ref={el => this.education = el} defaultValue={education} type={'text'} className={'form-control'} id={'education'} required/>
                    </div>
                </form>
            </Modal>
        )
    }
}