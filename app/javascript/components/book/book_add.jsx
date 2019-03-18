import React from 'react'
import Modal from '../modal'
import Alert from '../alert'

export default class BookAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enable_alert: false
        }
    }

    addBook = () => {
        let title = this.refs.title.value;
        let author = this.refs.author.value;
        let mark = this.refs.mark.value;
        let publisher = this.refs.publisher.value;
        let pub_date = this.refs.pub_date.value;
        let price = this.refs.price.value;
        let ar_date = this.refs.ar_date.value;

        if (!(title && author && mark && publisher
            && pub_date && price && ar_date)) {
            // warning alert
            this.setState({
                enable_alert: true,
                alert_type: 'warning',
                alert_message: 'Не все поля заполнены'
            });
            return;
        }

        $.ajax({
            url: "/v1/books",
            type: "POST",
            data: { book: { library_id: this.props.lib_id, title: title, author: author, mark: mark,
                publisher: publisher, pub_date: pub_date, price: price, ar_date: ar_date } },
            success: (new_book) => {
                this.setState({
                    enable_alert: true,
                    alert_type: 'success',
                    alert_message: 'Новая книга добавлена'
                });
                this.props.updateTable(new_book);
            }
        });
    };

    render() {
        return (
            <Modal title={'Добавление новой книги'} saveFunction={this.addBook}>
                <form>
                    <div className={'form-group'}>
                        <label htmlFor={'title'}>Название</label>
                        <input ref={'title'} type={'text'} className={'form-control'} id={'title'} placeholder={'Наименование книги'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'author'}>Автор</label>
                        <input ref={'author'} type={'text'} className={'form-control'} id={'author'} placeholder={'Автор'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'mark'}>Шифр</label>
                        <input ref={'mark'} type={'text'} className={'form-control'} id={'mark'} placeholder={'Шифр'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'publisher'}>Издательство</label>
                        <input ref={'publisher'} type={'text'} className={'form-control'} id={'publisher'} placeholder={'Издательство'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'pub_date'}>Год издания</label>
                        <input ref={'pub_date'} type={'text'} className={'form-control'} id={'pub_date'} placeholder={'Год издания'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'price'}>Цена</label>
                        <input ref={'price'} type={'text'} className={'form-control'} id={'price'} placeholder={'Стоимость'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'ar_date'}>Дата поступления</label>
                        <input ref={'ar_date'} type={'text'} className={'form-control'} id={'ar_date'} placeholder={'Дата поступления'} required/>
                    </div>
                </form>
                {this.state.enable_alert ? <Alert type={this.state.alert_type} message={this.state.alert_message}/> : null}
            </Modal>
        )
    }
}