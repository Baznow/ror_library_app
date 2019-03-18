import React from 'react'
import Book from './book'
import BookAdd from './book_add'

export default class BooksTable extends React.Component {
    constructor(props) {
        super(props);

        const link_state = this.props.location.state;
        this.state = {
            books: [],
            book_pass: (link_state && link_state.is_enabled ? link_state : null)
        }
    }

    componentDidMount() {
        const library_id = this.props.match.params.id;
        if (isNaN(library_id)) {
            return;
        }
        $.getJSON(
            '/v1/books.json',
            { id: library_id },
            (response) => {
                this.setState({
                    books: response,
                    lib_id: library_id,
                })
            });
    }

    updateTableAdd = (new_book) => {
        let books = this.state.books.concat(new_book);
        this.setState({
            books: books,
        })
    };

    updateTableEdit = (book) => {
        $.ajax({
            url: `/v1/books/${book.id}`,
            type: 'PUT',
            data: { book: book },
            success: () => {
                let books = this.state.books.filter((i) => { return i.id != book.id });
                books.push(book);

                this.setState({
                    books: books,
                });
            }
        })
    };

    render() {
        let books = this.state.books.map((book) => {
            return (
                <Book key={book.id} book={book} updateTable={this.updateTableEdit} book_pass={this.state.book_pass}/>
            )
        });
        return (
            <main className={'d-flex flex-column flex-wrap'}>
                <BookAdd lib_id={this.state.lib_id} updateTable={this.updateTableAdd}/>
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
            </main>
        )
    }
}