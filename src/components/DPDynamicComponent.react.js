/* eslint-disable no-undef */
/* eslint-disable no-console */

import {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * DPDynamicComponent listens for messages and propagates them into the dash component hierarcy
 */
export default class DPDynamicComponent extends Component {
    constructor(props) {
        super(props);
        this.add_callback();
    }
    add_callback() {
        if( !global.dpd_comms ) {
            global.dpd_comms = {
                send:function(label, message) { console.log("Got label"); console.log(label); console.log("And message"); console.log(message) },
                receive : function(message) {
                    console.log("R Got incoming"); console.log(message);
                    for(var i in this.callbacks) { this.callbacks[i](message); };
                },
                add_callback : function(callback) { dpd_comms.callbacks.push(callback); },
                callbacks : []
            };
            // TODO register with global in parent window
        }
        global.dpd_comms.add_callback(this.handleMessage.bind(this));
    }
    handleMessage(e) {
        if( e.source == this.props.source && this.props.setProps ){
            this.props.setProps({value:e.value});
        }
    }
    render() {
        return null;
    }
}

DPDynamicComponent.propTypes = {
    /**1
     * The ID used to identify this component in Dash callbacks
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
