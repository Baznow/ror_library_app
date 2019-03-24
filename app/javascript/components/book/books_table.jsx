import React from 'react'
import Book from './book'
import BookForm from './book_form'

export default class BooksTable extends React.Component {
    constructor(props) {
        super(props);
        const link_state = this.props.location.state;
        this.state = {
            modal: false,
            books: [],
            book_pass: link_state || undefined
        }
    }

    componentDidMount() {
        const library_id = this.props.match.params.id;
        if (isNaN(library_id)) {
            return;
        }
        $.getJSON(
            `/v1/libraries/${library_id}/books.json`,
            (response) => {
                this.setState({
                    books: response,
                    library_id: library_id,
                })
            }
        );
    }

    updateTableAdd = (book) => {
        $.ajax({
            url: `/v1/libraries/${this.state.library_id}/books`,
            type: 'POST',
            data: {book: Object.assign({}, {library_id: this.state.library_id}, book)},
            success: (new_book) => {
                let books = this.state.books.concat(new_book);
                this.setState({
                    modal: false,
                    books: books
                })
            }
        });
    };

    updateTableEdit = (id, book) => {
        $.ajax({
            url: `/v1/libraries/${this.state.library_id}/books/${id}`,
            type: 'PUT',
            data: {book: book},
            success: (edited_book) => {
                let books = this.state.books;
                let index = books.findIndex(e => e.id == edited_book.id);
                books.splice(index, 1, edited_book);
                this.setState({
                    modal: false,
                    books: books
                });
            }
        })
    };

    callModal = (book) => {
        this.setState({
            modal: true,
            edit_book: book
        })
    };

    handleAddButton = () => {
        this.setState({
            modal: true,
            edit_book: undefined
        })
    }

    render() {
        let books = this.state.books.map((book) => {
            return (
                <Book key={book.id} book={book} callModal={this.callModal} book_pass={this.state.book_pass}/>
            )
        });
        return (
            <main className={'d-flex flex-column'}>
                <button className={'btn btn-primary align-self-end mb-4'} style={{flex: '1', flexShrink: '0'}} onClick={this.handleAddButton}>
                    Добавить
                </button>
                
                <BookForm modal={this.state.modal} edit_book={this.state.edit_book} updateTableAdd={this.updateTableAdd} updateTableEdit={this.updateTableEdit}/>
                
                <div className={'table-responsive'}>
                    <table className={'table table-hover'}>
                        <thead className={'thead-light'}>
                        <tr>
                            <th>Наименование книги</th>
                            <th>Автор</th>
                            <th>Шифр</th>
                            <th>Издательство</th>
                            <th>Год издания</th>
                            <th>Цена</th>
                            <th>Дата поступления</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {books}
                        </tbody>
                    </table>
                </div>
            </main>
        )
    }
}