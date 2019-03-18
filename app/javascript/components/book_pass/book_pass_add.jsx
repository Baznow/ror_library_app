import React from 'react'
import { Link } from "react-router-dom";
import Alert from '../alert'

export default class BookPassAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enable_alert: false
        }
    }

    componentDidMount() {
        if (this.props.modalEnable) {
            $('#modalPattern').modal('show');
        }
    }

    handleSaveButton = () => {
        let title = this.refs.title.value;
        let name = this.refs.name.value;
        let pass_date = this.refs.pass_date.value;
        let return_date = this.refs.return_date.value;

        if (!(title && name && pass_date && return_date)) {
            // warning alert
            this.setState({
                enable_alert: true,
                alert_type: 'warning',
                alert_message: 'Не все поля заполнены'
            });
            return;
        }

        $.ajax({
            url: "/v1/book_passes",
            type: "POST",
            data: { book_pass: { book_id: this.props.book.id, subscriber_id: this.props.subscriber.id, 
                pass_date: pass_date, return_date: return_date } },
            success: (new_book_pass) => {
                this.setState({
                    enable_alert: true,
                    alert_type: 'success',
                    alert_message: 'Выдача произведена'
                });
                this.props.updateTable({id: new_book_pass.id, book_id: this.props.book.id, subscriber_id: this.props.subscriber.id, 
                    pass_date: pass_date, return_date: return_date, title: title, name: name, surname: ''});
            }
        });
    }

    render() {
        return (
            <div className={'modal fade'} id={'modalPattern'} tabIndex={'-1'} role={'dialog'}
                aria-labelledby={'modalLabel'} aria-hidden={'true'}>
                <div className={'modal-dialog'} role={'document'}>
                    <div className={'modal-content'}>
                        <div className={'modal-header'}>
                            <h5 className={'modal-title'} id={'modalLabel'}>{'Выдачи книги'}</h5>
                            <button className={'close'} data-dismiss={'modal'} aria-label={'Close'}>
                                <span aria-hidden={'true'}>&times;</span>
                            </button>
                        </div>
                        <div className={'modal-body'}>
                            <form>
                                <div className={'form-group'}>
                                    <label>Книга</label>
                                    <Link to={{
                                        pathname: '/libraries/' + this.props.lib_id + '/books',
                                        state: {
                                            is_enabled: true,
                                            subscriber: this.props.subscriber
                                        }
                                    }} className={'btn btn-secondary btn-sm my-1 mx-3'} onClick={() => $('#modalPattern').modal('hide')}>
                                        Выбрать
                                    </Link>
                                    <input type={'text'} ref={'title'} className={'form-control'} value={this.props.book.title} readOnly/>
                                </div>
                                <div className={'form-group'}>
                                    <label>Абонент</label>
                                    <Link to={{
                                        pathname: '/libraries/' + this.props.lib_id + '/subscribers',
                                        state: {
                                            is_enabled: true,
                                            book: this.props.book
                                        }
                                    }} className={'btn btn-secondary btn-sm my-1 mx-3'} onClick={() => $('#modalPattern').modal('hide')}>
                                        Выбрать
                                    </Link>
                                    <input type={'text'} ref={'name'} className={'form-control'} value={this.props.subscriber.name} readOnly/>
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor={'pass_date'}>Дата выдачи</label>
                                    <input ref={'pass_date'} type={'date'} className={'form-control'} id={'pass_date'} required/>
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor={'return_date'}>Дата возврата</label>
                                    <input ref={'return_date'} type={'date'} className={'form-control'} id={'return_date'} required/>
                                </div>
                            </form>
                            {this.state.enable_alert ? <Alert type={this.state.alert_type} message={this.state.alert_message}/> : null}
                        </div>
                        <div className={'modal-footer'}>
                            <button className={'btn btn-secondary'} data-dismiss={'modal'}>Закрыть</button>
                            <button className={'btn btn-primary'} onClick={this.handleSaveButton}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}