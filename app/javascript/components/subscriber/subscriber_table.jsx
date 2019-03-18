import React from 'react'
import Subscriber from './subscriber'
import SubscriberAdd from './subscriber_add'

export default class SubscriberTable extends React.Component {
    constructor(props) {
        super(props);

        const link_state = this.props.location.state;
        this.state = {
            subscribers: [],
            book_pass: (link_state && link_state.is_enabled ? link_state : null)
        }
    }

    componentDidMount() {
        const library_id = this.props.match.params.id;

        if (isNaN(library_id)) {
            return;
        }

        $.getJSON(
            '/v1/subscribers.json',
            { id: library_id },
            (response) => {
                this.setState({
                    subscribers: response,
                    lib_id: library_id
                })
            });
    }

    updateTableAdd = (new_subscriber) => {
        let subscribers = this.state.subscribers.concat(new_subscriber);
        this.setState({
            subscribers: subscribers,
        })
    };

    updateTableEdit = (subscriber) => {
        $.ajax({
            url: `/v1/subscribers/${subscriber.id}`,
            type: 'PUT',
            data: { subscriber: subscriber },
            success: () => {
                let subscribers = this.state.subscribers.filter((i) => { return i.id != subscriber.id });
                subscribers.push(subscriber);

                this.setState({
                    subscribers: subscribers,
                });
            }
        })
    };

    render() {
        let subscribers = this.state.subscribers.map((subscriber) => {
            return (
                <Subscriber key={subscriber.id} subscriber={subscriber} updateTable={this.updateTableEdit} book_pass={this.state.book_pass}/>
            )
        });
        return (
            <main className={'d-flex flex-column flex-wrap'}>
                <SubscriberAdd lib_id={this.state.lib_id} updateTable={this.updateTableAdd}/>
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
            </main>
        )
    }
}