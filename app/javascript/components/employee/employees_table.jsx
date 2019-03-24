import React from 'react'
import Employee from './employee';
import EmployeeForm from './employee_form'

export default class EmployeesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            employees: []
        }
    }

    componentDidMount() {
        const library_id = this.props.match.params.id;
        if (isNaN(library_id)) {
            return;
        }
        $.getJSON(
            `/v1/libraries/${library_id}/employees.json`,
            (response) => {
                this.setState({
                    employees: response,
                    library_id: library_id,
                })
            });
    }

    updateTableAdd = (employee) => {
        $.ajax({
            url: `/v1/libraries/${this.state.library_id}/employees`,
            type: 'POST',
            data: {employee: Object.assign({}, {library_id: this.state.library_id}, employee)},
            success: (new_employee) => {
                let employees = this.state.employees.concat(new_employee);
                this.setState({
                    modal: false,
                    employees: employees,
                })
            }
        });
    };

    updateTableEdit = (id, employee) => {
        $.ajax({
            url: `/v1/libraries/${this.state.library_id}/employees/${id}`,
            type: 'PUT',
            data: {employee: employee},
            success: (edited_employee) => {
                let employees = this.state.employees;
                let index = employees.findIndex(e => e.id == edited_employee.id);
                employees.splice(index, 1, edited_employee);
                this.setState({
                    modal: false,
                    employees: employees
                });
            }
        })
    };

    callModal = (employee) => {
        this.setState({
            modal: true,
            edit_employee: employee
        })
    };

    handleAddButton = () => {
        this.setState({
            modal: true,
            edit_employee: undefined
        })
    }

    render() {
        let employees = this.state.employees.map((employee) => {
            return (
                <Employee key={employee.id} employee={employee} callModal={this.callModal}/>
            )
        });
        return (
            <main className={'d-flex flex-column'}>
                <button className={'btn btn-primary align-self-end mb-4'} style={{flex: '1', flexShrink: '0'}} onClick={this.handleAddButton}>
                    Добавить
                </button>

                <EmployeeForm modal={this.state.modal} edit_employee={this.state.edit_employee} updateTableAdd={this.updateTableAdd} updateTableEdit={this.updateTableEdit}/>
                
                <div className={'table-responsive'}>
                    <table className={'table table-hover'}>
                        <thead className={'thead-light'}>
                        <tr>
                            <th>Фамилия</th>
                            <th>Имя</th>
                            <th>Отчество</th>
                            <th>Дата рождения</th>
                            <th>Дата принятия на работу</th>
                            <th>Должность</th>
                            <th>Образование</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {employees}
                        </tbody>
                    </table>
                </div>
            </main>
        )
    }
}