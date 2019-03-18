import React from 'react'
import LibraryAdd from './library_add'
import Library from './library'

export default class LibrariesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            libraries: []
        }
    }

    componentDidMount() {
        $.getJSON(
            '/v1/libraries.json', 
            (response) => this.setState({ 
                libraries: response 
            })
        );
    }

    updateTableAdd = (new_library) => {
        let libraries = this.state.libraries.concat(new_library);
        this.setState({
            libraries: libraries,
        })
    };

    updateTableEdit = (library) => {
        $.ajax({
            url: `/v1/libraries/${library.id}`,
            type: 'PUT',
            data: { library: library },
            success: () => {
                let libraries = this.state.libraries.filter((i) => { return i.id != library.id });
                libraries.push(library);

                this.setState({
                    libraries: libraries
                });
            }
        })
    };

    render() {
        let libraries = this.state.libraries.map((library) => {
            return (
                <Library key={library.id} library={library} updateTable={this.updateTableEdit}/>
            )
        });

        return (
            <main className={'d-flex flex-column flex-wrap'}>
                <LibraryAdd updateTable={this.updateTableAdd}/>
                <table className={'table table-hover'}>
                    <thead className={'thead-light'}>
                        <tr>
                            <th>Номер</th>
                            <th>Наименование</th>
                            <th>Адрес</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {libraries}
                    </tbody>
                </table>
            </main>
        )
    }
}