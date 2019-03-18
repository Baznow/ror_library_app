import React from 'react'

export default class BookPass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
        }
    }

    render() {
        let book_title = this.props.book_pass.title;
        let subscriber = this.props.book_pass.surname + ' ' + this.props.book_pass.name;
        let pass_date = this.props.book_pass.pass_date;
        let return_date = this.props.book_pass.return_date;

        if (this.state.editable) {
            book_title = <button className={'btn btn-secondary btn-sm'}>{book_title}</button>
            subscriber = <button className={'btn btn-secondary btn-sm'}>{subscriber}</button>
            pass_date = <input className={'w-100'} type={'text'} ref={'pass_date'} defaultValue={pass_date}/>;
            return_date = <input className={'w-100'} type={'text'} ref={'return_date'} defaultValue={return_date}/>;
        }

        return (
            <tr>
                <td>{book_title}</td>
                <td>{subscriber}</td>
                <td>{pass_date}</td>
                <td>{return_date}</td>
            </tr>
        )
    }
}