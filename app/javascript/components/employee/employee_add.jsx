import React from 'react'
import Modal from '../modal'
import Alert from '../alert'

export default class EmployeeAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enable_alert: false
        }
    }

    addEmployee = () => {
        let surname = this.refs.surname.value;
        let name = this.refs.name.value;
        let patronymic = this.refs.patronymic.value;
        let birthday = this.refs.birthday.value;
        let employ_date = this.refs.employ_date.value;
        let position = this.refs.position.value;
        let education = this.refs.education.value;

        if (!(surname && name && patronymic && birthday
            && employ_date && position && education)) {
            // warning alert
            this.setState({
                enable_alert: true,
                alert_type: 'warning',
                alert_message: 'Не все поля заполнены'
            });
            return;
        }

        $.ajax({
            url: "/v1/employees",
            type: "POST",
            data: { employee: { library_id: this.props.lib_id, surname: surname, name: name, patronymic: patronymic,
                    birthday: birthday, employ_date: employ_date, position: position, education: education } },
            success: (new_employee) => {
                this.setState({
                    enable_alert: true,
                    alert_type: 'success',
                    alert_message: 'Новый сотрудник добавлен'
                });
                this.props.updateTable(new_employee);
            }
        });
    };

    render() {
        return (
            <Modal title={'Добавление нового сотрудника'} saveFunction={this.addEmployee}>
                <form>
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
                        <label htmlFor={'birthday'}>Дата рождения</label>
                        <input ref={'birthday'} type={'text'} className={'form-control'} id={'birthday'} placeholder={'Дата рождения'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'employ_date'}>Дата принятия на работу</label>
                        <input ref={'employ_date'} type={'text'} className={'form-control'} id={'employ_date'} placeholder={'Дата принятия на работу'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'position'}>Должность</label>
                        <input ref={'position'} type={'text'} className={'form-control'} id={'position'} placeholder={'Должность'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'education'}>Образование</label>
                        <input ref={'education'} type={'text'} className={'form-control'} id={'education'} placeholder={'Образование'} required/>
                    </div>
                </form>
                {this.state.enable_alert ? <Alert type={this.state.alert_type} message={this.state.alert_message}/> : null}
            </Modal>
        )
    }
}