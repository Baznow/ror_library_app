import React from 'react'

export default class TopBook extends React.Component {
    render() {
        let title = this.props.book.title;
        let author = this.props.book.author;
        let mark = this.props.book.mark;
        let publisher = this.props.book.publisher;
        let pub_date = this.props.book.pub_date;
        let price = this.props.book.price;
        let ar_date = this.props.book.ar_date;

        return (
            <tr>
                <td>{title}</td>
                <td>{author}</td>
                <td>{mark}</td>
                <td>{publisher}</td>
                <td>{pub_date}</td>
                <td>{price}</td>
                <td>{ar_date}</td>
            </tr>
        )
    }
}