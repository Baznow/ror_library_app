import React from 'react'

export default class Employee extends React.Component {
    handleEditButton = () => {
        this.props.callModal(this.props.employee);
    };

    render() {
        let surname = this.props.employee.surname;
        let name = this.props.employee.name;
        let patronymic = this.props.employee.patronymic;
        let birthday = this.props.employee.birthday;
        let employ_date = this.props.employee.employ_date;
        let position = this.props.employee.position;
        let education = this.props.employee.education;

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
                        Изменить
                    </button>
                </td>
            </tr>
        )
    }
}