import React from 'react'
import Modal from '../modal'

export default class BookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_id: 'modal_book',
            form_id: 'form_book'
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let book = {
            title: this.title.value,
            author: this.author.value,
            mark: this.mark.value,
            publisher: this.publisher.value,
            pub_date: this.pub_date.value,
            price: this.price.value,
            ar_date: this.ar_date.value
        }

        document.getElementById(this.state.form_id).reset();

        if (this.props.edit_book) {
            this.props.updateTableEdit(this.props.edit_book.id, book);
        } else {
            this.props.updateTableAdd(book);
        }
    };

    render() {
        let {title = '', author = '', mark = '', publisher = '', pub_date = '', price = '', ar_date = '' } = this.props.edit_book || {};
        return (
            <Modal enable={this.props.modal} title={this.props.edit_book ? 'Изменение книги' : 'Добавление новой книги'} modal_id={this.state.modal_id} form_id={this.state.form_id}>
                <form id={this.state.form_id} onSubmit={() => this.handleSubmit(event)}>
                    <div className={'form-group'}>
                        <label htmlFor={'title'}>Название</label>
                        <input ref={el => this.title = el} defaultValue={title} type={'text'} className={'form-control'} id={'title'} placeholder={'Наименование книги'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'author'}>Автор</label>
                        <input ref={el => this.author = el} defaultValue={author} type={'text'} className={'form-control'} id={'author'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'mark'}>Шифр</label>
                        <input ref={el => this.mark = el} defaultValue={mark} type={'text'} className={'form-control'} id={'mark'} placeholder={'Книжный шифр'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'publisher'}>Издательство</label>
                        <input ref={el => this.publisher= el} defaultValue={publisher} type={'text'} className={'form-control'} id={'publisher'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'pub_date'}>Год издания</label>
                        <input ref={el => this.pub_date = el} defaultValue={pub_date} type={'number'} className={'form-control'} id={'pub_date'} min={'0'} step={'1'} max={new Date().getFullYear()} placeholder={'гггг'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'price'}>Цена</label>
                        <input ref={el => this.price = el} defaultValue={price} type={'number'} className={'form-control'} id={'price'} min={'0'} step={'0.01'} placeholder={'0,00'} required/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'ar_date'}>Дата поступления</label>
                        <input ref={el => this.ar_date = el} defaultValue={ar_date} type={'date'} className={'form-control'} id={'ar_date'} required/>
                    </div>
                </form>
            </Modal>
        )
    }
}