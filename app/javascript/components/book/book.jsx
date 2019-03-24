import React from 'react'
import { Link } from "react-router-dom";

export default class Book extends React.Component {
    handleEditButton = () => {
        this.props.callModal(this.props.book);
    };

    render() {
        let title = this.props.book.title;
        let author = this.props.book.author;
        let mark = this.props.book.mark;
        let publisher = this.props.book.publisher;
        let pub_date = this.props.book.pub_date;
        let price = this.props.book.price;
        let ar_date = this.props.book.ar_date;

        return (
            <tr>
                <td>{title}</td>
                <td>{author}</td>
                <td>{mark}</td>
                <td>{publisher}</td>
                <td>{pub_date}</td>
                <td>{price}</td>
                <td>{ar_date}</td>
                <td className={'text-right'}>
                    <div className={'d-flex justify-content-end align-items-center'}>
                        {this.props.book_pass 
                            ? null 
                            : <button className={'btn btn-secondary btn-sm'} onClick={this.handleEditButton}>
                                Изменить
                            </button>}

                        <Link to={{
                                pathname: '/libraries/' + this.props.book.library_id + '/book_passes',
                                state: {
                                    modal: true,
                                    edit_mode: this.props.book_pass && this.props.book_pass.edit_mode,
                                    id: this.props.book_pass && this.props.book_pass.id,
                                    book: { id: this.props.book.id, title: title },
                                    subscriber: (this.props.book_pass && this.props.book_pass.subscriber) || { id: 0, name: '' },
                                    pass_date: (this.props.book_pass && this.props.book_pass.pass_date) || '',
                                    return_date: (this.props.book_pass && this.props.book_pass.return_date) || ''
                                }
                            }} className={'btn btn-secondary btn-sm ml-1'}>
                            {this.props.book_pass ? 'Выбрать' : 'Выдать'}
                        </Link>
                    </div>
                </td>
            </tr>
        )
    }
}