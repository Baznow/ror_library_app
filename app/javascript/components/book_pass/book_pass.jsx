import React from 'react'

export default class BookPass extends React.Component {
    handleEditButton = () => {
        this.props.callModal(this.props.book_pass);
    };

    render() {
        let book_title = this.props.book_pass.title;
        let subscriber = this.props.book_pass.surname + ' ' + this.props.book_pass.name;
        let pass_date = this.props.book_pass.pass_date;
        let return_date = this.props.book_pass.return_date;

        return (
            <tr>
                <td>{book_title}</td>
                <td>{subscriber}</td>
                <td>{pass_date}</td>
                <td>{return_date}</td>
                <td className={'text-right'}>
                    <button className={'btn btn-secondary btn-sm'} onClick={this.handleEditButton}>
                        Изменить
                    </button>
                </td>
            </tr>
        )
    }
}