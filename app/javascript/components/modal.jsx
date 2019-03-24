import React from 'react'

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enable: false
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.enable) {
            $('#' + props.modal_id).modal('show');
        } else {
            $('#' + props.modal_id).modal('hide');
        }
        return null;
    }

    render() {
        return (
            <div className={'modal fade'} id={this.props.modal_id} tabIndex={'-1'} role={'dialog'}
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
                            <button type={'submit'} form={this.props.form_id} className={'btn btn-primary'}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}