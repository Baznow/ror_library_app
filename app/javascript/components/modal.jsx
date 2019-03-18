import React from 'react'

export default class Modal extends React.Component {
    handleSaveButton = () => {
      this.props.saveFunction();
    };

    render() {
        return (
            <div className={'d-flex justify-content-end mb-4'}>
                <button className={'btn btn-primary'} data-toggle={'modal'} data-target={'#modalPattern'}>
                    Добавить
                </button>

                <div className={'modal fade'} id={'modalPattern'} tabIndex={'-1'} role={'dialog'}
                     aria-labelledby={'modalLabel'} aria-hidden={'true'}>
                    <div className={'modal-dialog'} role={'document'}>
                        <div className={'modal-content'}>
                            <div className={'modal-header'}>
                                <h5 className={'modal-title'} id={'modalLabel'}>{this.props.title}</h5>
                                <button className={'close'} data-dismiss={'modal'} aria-label={'Close'}>
                                    <span aria-hidden={'true'}>&times;</span>
                                </button>
                            </div>
                            <div className={'modal-body'}>
                                {this.props.children}
                            </div>
                            <div className={'modal-footer'}>
                                <button className={'btn btn-secondary'} data-dismiss={'modal'}>Закрыть</button>
                                <button className={'btn btn-primary'} onClick={this.handleSaveButton}>Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}