import React from 'react'
import { Link } from "react-router-dom";

export default class Library extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
        }
    }

    handleEditButton = () => {
        let editable = this.state.editable;

        if (editable) {
            let number = this.refs.number.value;
            let name = this.refs.name.value;
            let address = this.refs.address.value;
            let library = {id: this.props.library.id, number: number, name: name, address: address};
            this.props.updateTable(library);
        }

        this.setState({
            editable: !editable,
        })
    };

    render() {
        let id = this.props.library.id;
        let number = this.props.library.number;
        let name = this.props.library.name;
        let address = this.props.library.address;

        if (this.state.editable) {
            number = <input type={'text'} ref={'number'} defaultValue={number}/>;
            name = <input type={'text'} ref={'name'} defaultValue={name}/>;
            address = <input type={'text'} ref={'address'} defaultValue={address}/>;
        }

        return (
            <tr>
                <td>{number}</td>
                <td>{name}</td>
                <td>{address}</td>
                <td className={'text-right'}>
                    <button className={'btn btn-secondary btn-sm'} onClick={this.handleEditButton}>
                        {this.state.editable ? 'Сохранить' : 'Изменить'}
                    </button>
                    <Link to={'/libraries/' + id} className={'btn btn-secondary btn-sm mx-1'}>
                        Открыть
                    </Link>
                </td>
            </tr>
        )
    }
}