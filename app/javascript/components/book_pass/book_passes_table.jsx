import React from 'react'
import BookPass from './book_pass'
import BookPassForm from './book_pass_form'

export default class BookPassesTable extends React.Component {
    constructor(props) {
        super(props);
        let link_state = this.props.location.state;
        this.state = {
            modal: link_state,
            book_passes: [],
            edit_mode: link_state && link_state.edit_mode,
            id: link_state && link_state.id,
            book: (link_state && link_state.book) || { id: 0, title: '' },
            subscriber: (link_state && link_state.subscriber) || { id: 0, name: ''},
            pass_date: (link_state && link_state.pass_date) || '',
            return_date: (link_state && link_state.return_date) || ''
        }
    }

    componentDidMount() {
        const library_id = this.props.match.params.id;
        if (isNaN(library_id)) {
            return;
        }
        $.getJSON(
            `/v1/libraries/${library_id}/book_passes.json`,
            (response) => {
                this.setState({
                    book_passes: response,
                    library_id: library_id,
                })
            }
        );
    }

    updateTableAdd = (book_pass) => {
        $.ajax({
            url: `/v1/libraries/${this.state.library_id}/book_passes`,
            type: 'POST',
            data: {book_pass: book_pass},
            success: (new_book_pass) => {
                let book_passes = this.state.book_passes.concat(new_book_pass);
                this.setState({
                    modal: false,
                    book_passes: book_passes
                })
            }
        });
    };

    updateTableEdit = (id, book_pass) => {
        $.ajax({
            url: `/v1/libraries/${this.state.library_id}/book_passes/${id}`,
            type: 'PUT',
            data: {book_pass: book_pass},
            success: (edited_book_pass) => {
                let book_passes = this.state.book_passes;
                let index = book_passes.findIndex(bp => bp.id == edited_book_pass[0].id);
                book_passes.splice(index, 1, edited_book_pass[0]);
                this.setState({
                    modal: false,
                    book_passes: book_passes
                });
            }
        })
    };

    callModal = (book_pass) => {
        this.setState({
            modal: true,
            edit_book_pass: book_pass
        })
    };

    render() {
        let book_passes = this.state.book_passes.map((book_pass) => {
            return (
                <BookPass key={book_pass.id} callModal={this.callModal} book_pass={book_pass}/>
            )
        });

        return (
            <main className={'d-flex flex-column flex-wrap'}>
                
                <BookPassForm modal={this.state.modal} edit_book_pass={this.state.edit_book_pass} updateTableAdd={this.updateTableAdd} updateTableEdit={this.updateTableEdit} 
                    library_id={this.state.library_id} edit_mode={this.state.edit_mode} id={this.state.id}
                    book={this.state.book} subscriber={this.state.subscriber} pass_date={this.state.pass_date} return_date={this.state.return_date}/>
                
                <div className={'table-responsive'}>
                    <table className={'table table-hover'}>
                        <thead className={'thead-light'}>
                        <tr>
                            <th>Книга</th>
                            <th>Абонент</th>
                            <th>Дата выдачи</th>
                            <th>Дата возврата</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {book_passes}
                        </tbody>
                    </table>
                </div>
            </main>
        )
    }
}