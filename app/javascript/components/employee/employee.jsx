import React from 'react'

export default class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
        }
    }

    handleEditButton = () => {
        let editable = this.state.editable;

        if (editable) {
            let library_id = this.props.employee.library_id;
            let surname = this.refs.surname.value;
            let name = this.refs.name.value;
            let patronymic = this.refs.patronymic.value;
            let birthday = this.refs.birthday.value;
            let employ_date = this.refs.employ_date.value;
            let position = this.refs.position.value;
            let education = this.refs.education.value;

            let employee = {id: this.props.employee.id, library_id: library_id, surname: surname, name: name,
                patronymic: patronymic, birthday: birthday, employ_date: employ_date, position: position, education: education};
            this.props.updateTable(employee);
        }

        this.setState({
            editable: !editable,
        })
    };

    render() {
        let surname = this.props.employee.surname;
        let name = this.props.employee.name;
        let patronymic = this.props.employee.patronymic;
        let birthday = this.props.employee.birthday;
        let employ_date = this.props.employee.employ_date;
        let position = this.props.employee.position;
        let education = this.props.employee.education;

        if (this.state.editable) {
            surname = <input className={'w-100'} type={'text'} ref={'surname'} defaultValue={surname}/>;
            name = <input className={'w-100'} type={'text'} ref={'name'} defaultValue={name}/>;
            patronymic = <input className={'w-100'} type={'text'} ref={'patronymic'} defaultValue={patronymic}/>;
            birthday = <input className={'w-100'} type={'text'} ref={'birthday'} defaultValue={birthday}/>;
            employ_date = <input className={'w-100'} type={'text'} ref={'employ_date'} defaultValue={employ_date}/>;
            position = <input className={'w-100'} type={'text'} ref={'position'} defaultValue={position}/>;
            education = <input className={'w-100'} type={'text'} ref={'education'} defaultValue={education}/>;
        }

        return (
            <tr>
                <td>{surname}</td>
                <td>{name}</td>
                <td>{patronymic}</td>
                <td>{birthday}</td>
                <td>{employ_date}</td>
                <td>{position}</td>
                <td>{education}</td>
                <td className={'text-right'}>
                    <button className={'btn btn-secondary btn-sm'} onClick={this.handleEditButton}>
                        {this.state.editable ? 'Сохранить' : 'Изменить'}
                    </button>
                </td>
            </tr>
        )
    }
}