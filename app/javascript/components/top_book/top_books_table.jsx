import React from 'react'
import TopBook from './top_book'

export default class TopBooksTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        const library_id = this.props.match.params.id;
        if (isNaN(library_id)) {
            return;
        }
        $.getJSON(
            '/v1/top_books.json',
            { id: library_id },
            (response) => {
                this.setState({
                    books: response,
                })
            });
    }

    render() {
        let books = this.state.books.map((book) => {
            return (
                <TopBook key={book.id} book={book}/>
            )
        });
        return (
            <main className={'d-flex flex-column flex-wrap'}>
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