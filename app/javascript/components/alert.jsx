import React from 'react'

export default class Alert extends React.Component {
    render() {
        $("#alert_id").show();
        window.setTimeout(function() {
            $("#alert_id").hide();
        }, 2000);
        return (
            <div className={'alert alert-' + this.props.type} role={'alert'} id={'alert_id'}>
                <button className={'close'} aria-label={'Close'}>
                        <span aria-hidden={'true'}>
                            &times;
                        </span>
                </button>
                <strong>{this.props.type + ' ! '}</strong>
                {this.props.message}
            </div>
        )
    }
}