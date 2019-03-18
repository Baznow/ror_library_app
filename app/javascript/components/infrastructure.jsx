import React from 'react'
import { Link } from 'react-router-dom'

export default class Infrastructure extends React.Component {
    card = (name, text, link) => {
        return (
            <Link to={this.props.location.pathname + link} className={'card btn m-4 shadow-sm'} style={{width: '12rem', height: '12rem', background: '#dcf2b0'}}>
                <div className={'card-body'}>
                    <h5 className={'card-title'}>
                        {name}
                    </h5>
                    <p className={'card-text'}>
                        {text}
                    </p>
                </div>
            </Link>
        )
    };

    render() {
        return (
            <main className={'d-flex justify-content-around flex-wrap'}>
                {this.card('Сотрудники', '', '/employees')}
                {this.card('Книги', '', '/books')}
                {this.card('Абоненты', '', '/subscribers')}
                {this.card('Выданные книги', '', '/book_passes')}
                {this.card('Популярные книги', '', '/top_books')}
            </main>
        )
    }
}