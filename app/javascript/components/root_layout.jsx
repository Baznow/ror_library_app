import React from 'react'
import { withRouter, Link } from "react-router-dom";

class RootLayout extends React.Component {

    getBackURL = () => {
        let url = this.props.location.pathname.split('/');
        url.pop();
        return url.length > 1 ? url.join('/') : '/';
    };

    render() {
        let cur_url = this.props.location.pathname;
        let url_arr = cur_url.split('/');
        let last_part = url_arr[url_arr.length - 1];
        let header_title;

        switch(last_part) {
            case 'top_books':
                header_title = 'Популярные книги';
                break;
            case 'book_passes':
                header_title = 'Выданные книги';
                break;
            case 'subscribers':
                header_title = 'Абоненты';
                break;
            case 'employees':
                header_title = 'Сотрудники';
                break;
            case 'books':
                header_title = 'Книги';
                break;
            case 'libraries':
                header_title = 'Библиотеки';
                break;
            case '':
                header_title = 'Управление библиотеками';
                break;
            default:
                header_title = 'Структура';
                break;
        }

        let pageControlButton = cur_url === '/'
            ? <Link to={'/libraries'} className={"btn btn-primary btn-lg"}>Начать</Link>
            : <Link to={this.getBackURL()} className={"btn btn-secondary btn-lg"}>Назад</Link>

        return (
            <div style={{height: '100vh', background: '#c0c0c0'}}>
                <div className={'mx-auto d-flex flex-column w-50 h-100 shadow'} style={{background: '#ffffff'}}>
                    <header className={'px-3 pt-5 shadow'} style={{background: '#f3d060'}}>
                        <div className={'d-flex justify-content-between'}>
                            <div className={'d-flex align-items-start'}>
                                <Link to={'/'} className={'btn btn-outline-dark btn-lg'}>
                                    {'⚫'}
                                </Link>
                                <h1>
                                    {"|" + header_title}
                                </h1>
                            </div>
                            <div>
                                {pageControlButton}
                            </div>
                        </div>
                    </header>
                    <main className={'d-flex flex-column p-3'}>
                        {this.props.children}
                    </main>
                </div>
            </div>
        )
    }
}

export default withRouter(RootLayout);