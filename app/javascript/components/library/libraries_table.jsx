import React from 'react'
import LibraryForm from './library_form'
import Library from './library'

export default class LibrariesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
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

    updateTableAdd = (library) => {
        $.ajax({
            url: '/v1/libraries',
            type: 'POST',
            data: {library: library},
            success: (new_library) => {
                let libraries = this.state.libraries.concat(new_library);
                this.setState({
                    modal: false,
                    libraries: libraries
                })
            }
        });
    };

    updateTableEdit = (id, library) => {
        $.ajax({
            url: `/v1/libraries/${id}`,
            type: 'PUT',
            data: { library: library },
            success: (edited_library) => {
                let libraries = this.state.libraries;
                let index = libraries.findIndex(l => l.id == edited_library.id);
                libraries.splice(index, 1, edited_library);
                this.setState({
                    modal: false,
                    libraries: libraries
                });
            }
        })
    }

    callModal = (library) => {
        this.setState({
            modal: true,
            edit_library: library
        })
    };

    handleAddButton = () => {
        this.setState({
            modal: true,
            edit_library: undefined
        })
    }

    render() {
        let libraries = this.state.libraries.map((library) => {
            return (
                <Library key={library.id} library={library} callModal={this.callModal}/>
            )
        });
        return (
            <main className={'d-flex flex-column'}>
                <button className={'btn btn-primary align-self-end mb-3'} style={{flex: '1', flexShrink: '0'}} onClick={this.handleAddButton}>
                    Добавить
                </button>
                
                <LibraryForm modal={this.state.modal} edit_library={this.state.edit_library} updateTableAdd={this.updateTableAdd} updateTableEdit={this.updateTableEdit}/>

                <div className={'table-responsive'}>
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
                </div>
            </main>
        )
    }
}