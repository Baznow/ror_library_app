import React from 'react'
import Employee from './employee';
import EmployeeAdd from './employee_add'

export default class EmployeesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        const library_id = this.props.match.params.id;
        if (isNaN(library_id)) {
            return;
        }
        $.getJSON(
            '/v1/employees.json',
            { id: library_id },
            (response) => {
                this.setState({
                    employees: response,
                    lib_id: library_id,
                })
            });
    }

    updateTableAdd = (new_employee) => {
        let employees = this.state.employees.concat(new_employee);
        this.setState({
            employees: employees,
        })
    };

    updateTableEdit = (employee) => {
        $.ajax({
            url: `/v1/employees/${employee.id}`,
            type: 'PUT',
            data: { employee: employee },
            success: () => {
                let employees = this.state.employees.filter((i) => { return i.id != employee.id });
                employees.push(employee);

                this.setState({
                    employees: employees,
                });
            }
        })
    };

    render() {
        let employees = this.state.employees.map((employee) => {
            return (
                <Employee key={employee.id} employee={employee} updateTable={this.updateTableEdit}/>
            )
        });
        return (
            <main className={'d-flex flex-column flex-wrap'}>
                <EmployeeAdd lib_id={this.state.lib_id} updateTable={this.updateTableAdd}/>
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
            </main>
        )
    }
}