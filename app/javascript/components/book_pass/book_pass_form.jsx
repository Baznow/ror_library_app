import React from 'react'
import { Link } from "react-router-dom";
import Modal from '../modal'
import Alert from '../alert'

export default class BookPassForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_id: 'modal_book_pass',
            form_id: 'form_book_pass',
        }
    }

    static getDerivedStateFromProps(props, state) {
        let {id = '', book_id = '', title = '', subscriber_id = '', surname = '', name = '', pass_date = '', return_date = ''} = props.edit_book_pass || {};
        return {
            edit: props.edit_book_pass || props.edit_mode,
            id: id || props.id,
            book: (book_id && {id: book_id, title: title}) || props.book,
            subscriber: (subscriber_id && {id: subscriber_id, name: (surname + ' ' + name)}) || props.subscriber,
            pass_date: pass_date || state.pass_date || props.pass_date,
            return_date: return_date || state.return_date || props.return_date
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let book_pass = {
            book_id: this.state.book.id,
            subscriber_id: this.state.subscriber.id,
            pass_date: this.state.pass_date,
            return_date: this.state.return_date
        }

        if (!(this.state.book.title && this.state.subscriber.name)) {
            this.setState({
                enable_alert: true,
                alert_type: 'warning',
                alert_message: <span><strong>Внимание! </strong>Не выбрана книга или абонент</span>
            });
            return;
        }

        document.getElementById(this.state.form_id).reset();
        
        if (this.state.edit) {
            this.props.updateTableEdit(this.state.id, book_pass);
        } else {
            this.props.updateTableAdd(book_pass);
        }
    }

    render() {
        return (
            <Modal enable={this.props.modal} title={this.state.edit ? 'Изменение выдачи' : 'Новая выдача'} modal_id={this.state.modal_id} form_id={this.state.form_id}>
                <form id={this.state.form_id} onSubmit={() => this.handleSubmit(event)}>
                    <div className={'form-group'}>
                        <label>Книга</label>
                        <Link to={{
                                pathname: '/libraries/' + this.props.library_id + '/books',
                                state: {
                                    edit_mode: this.state.edit,
                                    id: this.state.id,
                                    subscriber: this.state.subscriber,
                                    pass_date: this.state.pass_date,
                                    return_date: this.state.return_date
                                }
                            }} className={'btn btn-secondary btn-sm my-1 mx-3'} onClick={() => {$('#modal_book_pass').modal('hide')}}>
                            Выбрать
                        </Link>
                        <input type={'text'} className={'form-control'} value={this.state.book.title} readOnly/>
                    </div>
                    <div className={'form-group'}>
                        <label>Абонент</label>
                        <Link to={{
                                pathname: '/libraries/' + this.props.library_id + '/subscribers',
                                state: {
                                    edit_mode: this.state.edit,
                                    id: this.state.id,
                                    book: this.state.book,
                                    pass_date: this.state.pass_date,
                                    return_date: this.state.return_date
                                }
                            }} className={'btn btn-secondary btn-sm my-1 mx-3'} onClick={() => {$('#modal_book_pass').modal('hide')}}>
                            Выбрать
                        </Link>
                        <input type={'text'} className={'form-control'} value={this.state.subscriber.name} readOnly/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'pass_date'}>Дата выдачи</label>
                        <input defaultValue={this.state.pass_date} onChange={event => this.setState({pass_date: event.target.value})} 
                            type={'date'} className={'form-control'} id={'pass_date'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'return_date'}>Дата возврата</label>
                        <input defaultValue={this.state.return_date} onChange={event => this.setState({return_date: event.target.value})} 
                            type={'date'} className={'form-control'} id={'return_date'} required/>
                    </div>
                    {this.state.enable_alert && <Alert type={this.state.alert_type} message={this.state.alert_message}/>}
                </form>
            </Modal>
        )
    }
}