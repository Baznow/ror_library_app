import React from 'react'
import Subscriber from './subscriber'
import SubscriberForm from './subscriber_form'

export default class SubscriberTable extends React.Component {
    constructor(props) {
        super(props);
        const link_state = this.props.location.state;
        this.state = {
            modal: false,
            subscribers: [],
            book_pass: link_state || undefined
        }
    }

    componentDidMount() {
        const library_id = this.props.match.params.id;
        if (isNaN(library_id)) {
            return;
        }
        $.getJSON(
            `/v1/libraries/${library_id}/subscribers.json`,
            (response) => {
                this.setState({
                    subscribers: response,
                    library_id: library_id
                })
            });
    }

    updateTableAdd = (subscriber) => {
        $.ajax({
            url: `/v1/libraries/${this.state.library_id}/subscribers`,
            type: 'POST',
            data: {subscriber: Object.assign({}, {library_id: this.state.library_id}, subscriber)},
            success: (new_subscriber) => {
                let subscribers = this.state.subscribers.concat(new_subscriber);
                this.setState({
                    modal: false,
                    subscribers: subscribers
                })
            }
        });
    };

    updateTableEdit = (id, subscriber) => {
        $.ajax({
            url: `/v1/libraries/${this.state.library_id}/subscribers/${id}`,
            type: 'PUT',
            data: {subscriber: subscriber},
            success: (edited_subscriber) => {
                let subscribers = this.state.subscribers;
                let index = subscribers.findIndex(e => e.id == edited_subscriber.id);
                subscribers.splice(index, 1, edited_subscriber);
                this.setState({
                    modal: false,
                    subscribers: subscribers
                });
            }
        })
    };

    callModal = (subscriber) => {
        this.setState({
            modal: true,
            edit_subscriber: subscriber
        })
    };

    handleAddButton = () => {
        this.setState({
            modal: true,
            edit_subscriber: undefined
        })
    }

    render() {
        let subscribers = this.state.subscribers.map((subscriber) => {
            return (
                <Subscriber key={subscriber.id} subscriber={subscriber} callModal={this.callModal} book_pass={this.state.book_pass}/>
            )
        });
        return (
            <main className={'d-flex flex-column'}>
                <button className={'btn btn-primary align-self-end mb-4'} style={{flex: '1', flexShrink: '0'}} onClick={this.handleAddButton}>
                    Добавить
                </button>
                
                <SubscriberForm modal={this.state.modal} edit_subscriber={this.state.edit_subscriber} updateTableAdd={this.updateTableAdd} updateTableEdit={this.updateTableEdit}/>
                
                <div className={'table-responsive'}>
                    <table className={'table table-hover'}>
                        <thead className={'thead-light'}>
                        <tr>
                            <th>Номер билета</th>
                            <th>Фамилия</th>
                            <th>Имя</th>
                            <th>Отчество</th>
                            <th>Адрес</th>
                            <th>Телефон</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {subscribers}
                        </tbody>
                    </table>
                </div>
            </main>
        )
    }
}