import React from 'react'
import { Link } from "react-router-dom";

export default class Book extends React.Component {
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
            let title = this.refs.title.value;
            let author = this.refs.author.value;
            let mark = this.refs.mark.value;
            let publisher = this.refs.publisher.value;
            let pub_date = this.refs.pub_date.value;
            let price = this.refs.price.value;
            let ar_date = this.refs.ar_date.value;

            let book = {id: this.props.book.id, library_id: library_id, title: title, author: author,
                mark: mark, publisher: publisher, pub_date: pub_date, price: price, ar_date: ar_date};
            this.props.updateTable(book);
        }

        this.setState({
            editable: !editable,
        })
    };

    render() {
        let title = this.props.book.title;
        let author = this.props.book.author;
        let mark = this.props.book.mark;
        let publisher = this.props.book.publisher;
        let pub_date = this.props.book.pub_date;
        let price = this.props.book.price;
        let ar_date = this.props.book.ar_date;

        if (this.state.editable) {
            title = <input className={'w-100'} type={'text'} ref={'title'} defaultValue={title}/>;
            author = <input className={'w-100'} type={'text'} ref={'author'} defaultValue={author}/>;
            mark = <input className={'w-100'} type={'text'} ref={'mark'} defaultValue={mark}/>;
            publisher = <input className={'w-100'} type={'text'} ref={'publisher'} defaultValue={publisher}/>;
            pub_date = <input className={'w-100'} type={'text'} ref={'pub_date'} defaultValue={pub_date}/>;
            price = <input className={'w-100'} type={'text'} ref={'price'} defaultValue={price}/>;
            ar_date = <input className={'w-100'} type={'text'} ref={'ar_date'} defaultValue={ar_date}/>;
        }

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
                    {this.props.book_pass 
                        ? null 
                        : <button className={'btn btn-secondary btn-sm'} onClick={this.handleEditButton}>
                            {this.state.editable ? 'Сохранить' : 'Изменить'}
                        </button>}

                    <Link to={{
                        pathname: '/libraries/' + this.props.book.library_id + '/book_passes',
                        state: {
                            auto_complete: true,
                            book: { id: this.props.book.id, title: title },
                            subscriber: (this.props.book_pass && this.props.book_pass.subscriber ? this.props.book_pass.subscriber : { id: 0, name: '' })
                        }
                    }} className={'btn btn-secondary btn-sm m-1'}>
                        {this.props.book_pass ? 'Выбрать' : 'Выдать'}
                    </Link>
                </td>
            </tr>
        )
    }
}