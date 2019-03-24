import React from 'react'
import { Link } from 'react-router-dom'

export default class Infrastructure extends React.Component {
    card = (name, link) => {
        return (
            <Link to={this.props.location.pathname + link} 
                className={'btn border border-dark m-4 shadow-sm'} 
                style={{width: '12rem', height: '12rem', background: '#dcf2b0'}}>
                <h5>{name}</h5>
            </Link>
        )
    };

    render() {
        return (
            <main className={'d-flex flex-column'}>
                <div className={'table-responsive'}>
                    <div className={'d-flex justify-content-center flex-wrap'}>
                        {this.card('Сотрудники', '/employees')}
                        {this.card('Книги', '/books')}
                        {this.card('Абоненты', '/subscribers')}
                        {this.card('Выданные книги', '/book_passes')}
                        {this.card('Популярные книги', '/top_books')}
                    </div>
                </div>
            </main>
        )
    }
}