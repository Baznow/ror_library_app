import React from 'react'
import { Link } from "react-router-dom";

export default class Subscriber extends React.Component {
    handleEditButton = () => {
        this.props.callModal(this.props.subscriber);
    };

    render() {
        let card_num = this.props.subscriber.card_num;
        let surname = this.props.subscriber.surname;
        let name = this.props.subscriber.name;
        let patronymic = this.props.subscriber.patronymic;
        let address = this.props.subscriber.address;
        let phone = this.props.subscriber.phone.toString();
        phone = '+' + phone[0] + ' (' + phone.substring(1, 4) + ') ' + phone.substring(4, 7) + ' ' + phone.substring(7, 9) + ' ' + phone.substring(9, 11);

        return (
            <tr>
                <td>{card_num}</td>
                <td>{surname}</td>
                <td>{name}</td>
                <td>{patronymic}</td>
                <td>{address}</td>
                <td>{phone}</td>
                <td className={'text-right'}>
                    {this.props.book_pass
                        ? <Link to={{
                                pathname: '/libraries/' + this.props.subscriber.library_id + '/book_passes',
                                state: {
                                    modal: true,
                                    edit_mode: this.props.book_pass.edit_mode,
                                    id: this.props.book_pass.id,
                                    book: this.props.book_pass.book,
                                    subscriber: { id: this.props.subscriber.id, name: surname + ' ' + name },
                                    pass_date: this.props.book_pass.pass_date || '',
                                    return_date: this.props.book_pass.return_date || ''
                                }
                            }} className={'btn btn-secondary btn-sm'}>
                            Выбрать
                        </Link>
                        : <button className={'btn btn-secondary btn-sm'} onClick={this.handleEditButton}>
                            Изменить
                        </button>}
                </td>
            </tr>
        )
    }
}