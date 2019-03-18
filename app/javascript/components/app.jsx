import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import RootLayout from './root_layout'
import LibrariesTable from './library/libraries_table'
import Infrastructure from './infrastructure'
import EmployeesTable from './employee/employees_table'
import BooksTable from './book/books_table'
import SubscribersTable from './subscriber/subscriber_table'
import BookPassesTable from './book_pass/book_passes_table'
import TopBooksTable from './top_book/top_books_table'
import Home from './home'

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <RootLayout>
                        <Switch>
                            <Route path={'/libraries/:id/employees'} component={EmployeesTable}/>
                            <Route path={'/libraries/:id/books'} component={BooksTable}/>
                            <Route path={'/libraries/:id/subscribers'} component={SubscribersTable}/>
                            <Route path={'/libraries/:id/book_passes'} component={BookPassesTable}/>
                            <Route path={'/libraries/:id/top_books'} component={TopBooksTable}/>
                            <Route path={'/libraries/:id'} component={Infrastructure}/>
                            <Route path={'/libraries'} component={LibrariesTable}/>
                            <Route path={'/'} component={Home}/>
                        </Switch>
                    </RootLayout>
                </div>
            </Router>

        )
    }
}