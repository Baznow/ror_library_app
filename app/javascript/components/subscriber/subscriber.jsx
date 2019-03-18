import React from 'react'
import { Link } from "react-router-dom";

export default class Subscriber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
        }
    }

    handleEditButton = () => {
        let editable = this.state.editable;

        if (editable) {
            let library_id = this.props.book.library_id;
            let card_num = this.refs.card_num.value;
            let surname = this.refs.surname.value;
            let name = this.refs.name.value;
            let patronymic = this.refs.patronymic.value;
            let address = this.refs.address.value;
            let phone = this.refs.phone.value;

            let subscriber = {id: this.props.subscriber.id, library_id: library_id, card_num: card_num, surname: surname,
                name: name, patronymic: patronymic, address: address, phone: phone };
            this.props.updateTable(subscriber);
        }

        this.setState({
            editable: !editable,
        })
    };

    render() {
        let card_num = this.props.subscriber.card_num;
        let surname = this.props.subscriber.surname;
        let name = this.props.subscriber.name;
        let patronymic = this.props.subscriber.patronymic;
        let address = this.props.subscriber.address;
        let phone = this.props.subscriber.phone;

        if (this.state.editable) {
            card_num = <input className={'w-100'} type={'text'} ref={'card_num'} defaultValue={card_num}/>;
            surname = <input className={'w-100'} type={'text'} ref={'surname'} defaultValue={surname}/>;
            name = <input className={'w-100'} type={'text'} ref={'name'} defaultValue={name}/>;
            patronymic = <input className={'w-100'} type={'text'} ref={'patronymic'} defaultValue={patronymic}/>;
            address = <input className={'w-100'} type={'text'} ref={'address'} defaultValue={address}/>;
            phone = <input className={'w-100'} type={'text'} ref={'phone'} defaultValue={phone}/>;
        }

        return (
            <tr>
                <td>{card_num}</td>
                <td>{surname}</td>
                <td>{name}</td>
                <td>{patronymic}</td>
                <td>{address}</td>
                <td>{phone}</td>
                <td className={'text-right'}>
                    {this.props.book_pass && this.props.book_pass.is_enabled 
                        ? <Link to={{
                            pathname: '/libraries/' + this.props.subscriber.library_id + '/book_passes',
                            state: {
                                auto_complete: true,
                                book: (this.props.book_pass.book),
                                subscriber: { id: this.props.subscriber.id, name: surname + ' ' + name }
                            }
                        }} className={'btn btn-secondary btn-sm m-1'}>
                            Выбрать
                        </Link>
                        : <button className={'btn btn-secondary btn-sm'} onClick={this.handleEditButton}>
                            {this.state.editable ? 'Сохранить' : 'Изменить'}
                        </button>}
                </td>
            </tr>
        )
    }
}