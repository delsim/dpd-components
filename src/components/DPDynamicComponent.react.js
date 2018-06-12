/* eslint-disable no-undef */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * DPDynamicComponent listens for messages and propagates them into the dash component
 */
export default class DPDynamicComponent extends Component {
    constructor(props) {
        super(props);
        global.dpd_comms.add_callback(this.handleMessage.bind(this));
    }
    handleMessage(e) {
        if( e.source == this.props.source && this.props.setProps ){
            this.props.setProps({value:e.value});
        }
    }
    doOnChange(event) {
        if (this.props.setProps) {
            this.props.setProps({
                value: event.target.value
            });
        }
    }
    doSourceChange(event) {
        if (this.props.setProps) {
            this.props.setProps({
                source: event.target.value
            });
        }
    }
    render() {
        const {id, setProps, source, value} = this.props;

        return (
            <div id={id}>
                DPDynamicComponent: source {source} with value {value}
                <input
                    value={value}
                    onChange={this.doOnChange.bind(this)}
                />
                <input
                    value={source}
                    onChange={this.doSourceChange.bind(this)}
                />
            </div>
        );
    }
}

DPDynamicComponent.propTypes = {
    /**1
     * The ID used to identify this compnent in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * The source name that the component listens to.
     */
    source: PropTypes.string,

    /**
     * The current value
     */
    value: PropTypes.string,

    /**
     * Dash-assigned callback that should be called whenever any of the
     * properties change
     */
    setProps: PropTypes.func
};
