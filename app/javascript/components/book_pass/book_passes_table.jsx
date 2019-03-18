import React from 'react'
import BookPass from './book_pass'
import BookPassAdd from './book_pass_add'

export default class BookPassesTable extends React.Component {
    constructor(props) {
        super(props);

        let link_state = this.props.location.state;
        this.state = {
            book_passes: [],
            modalEnable: (link_state && link_state.auto_complete ? true : false),
            book: (link_state && link_state.book ? link_state.book : { id: 0, title: '' }),
            subscriber: (link_state && link_state.subscriber ? link_state.subscriber : { id: 0, name: ''})
        }
    }

    componentDidMount() {
        const library_id = this.props.match.params.id;

        if (isNaN(library_id)) {
            return;
        }

        $.getJSON(
            '/v1/book_passes.json',
            { id: library_id },
            (response) => {
                this.setState({
                    book_passes: response,
                    lib_id: library_id,
                })
            });
    }

    updateTableAdd = (new_book_pass) => {
        let book_passes = this.state.book_passes.concat(new_book_pass);
        this.setState({
            book_passes: book_passes,
        })
    };

    render() {
        let book_passes = this.state.book_passes.map((book_pass) => {
            return (
                <BookPass key={book_pass.id} book_pass={book_pass}/>
            )
        });

        return (
            <main className={'d-flex flex-column flex-wrap'}>
                <BookPassAdd modalEnable={this.state.modalEnable} book={this.state.book} subscriber={this.state.subscriber} 
                    lib_id={this.state.lib_id} updateTable={this.updateTableAdd}/>
                <table className={'table table-hover'}>
                    <thead className={'thead-light'}>
                    <tr>
                        <th>Книга</th>
                        <th>Абонент</th>
                        <th>Дата выдачи</th>
                        <th>Дата возврата</th>
                    </tr>
                    </thead>
                    <tbody>
                        {book_passes}
                    </tbody>
                </table>
            </main>
        )
    }
}