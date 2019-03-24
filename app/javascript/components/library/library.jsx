import React from 'react'
import { Link } from "react-router-dom";

export default class Library extends React.Component {
    handleEditButton = () => {
        this.props.callModal(this.props.library);
    };

    render() {
        let id = this.props.library.id;
        let number = this.props.library.number;
        let name = this.props.library.name;
        let address = this.props.library.address;

        return (
            <tr>
                <td>{number}</td>
                <td>{name}</td>
                <td>{address}</td>
                <td className={'text-right'}>
                    <div className={'d-flex justify-content-end align-items-center'}>
                        <button className={'btn btn-secondary btn-sm'} onClick={this.handleEditButton}>
                            Изменить
                        </button>
                        <Link to={'/libraries/' + id} className={'btn btn-secondary btn-sm ml-1'}>
                            Открыть
                        </Link>
                    </div>
                </td>
            </tr>
        )
    }
}