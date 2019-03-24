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
            `/v1/libraries/${library_id}/top_books.json`,
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