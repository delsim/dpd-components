/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * Pipe component listens for messages and propagates them into the dash component hierarcy
 */
export default class Pipe extends Component {
    constructor(props) {
        super(props);
        this.add_callback();
    }
    add_callback() {
        if( !global.dpd_comms ) {
            global.dpd_comms = {
                send:function(message) {
                    if( this.senders.length > 0 ) {
                        for(var i in this.senders) {
                            this.senders[i].send(message);
                        }
                    } else {
                        this.messages.push(message);
                    }
                    console.log('Message'); console.log(message)
                },
                receive : function(message) {
                    for(var i in this.callbacks) { this.callbacks[i](message); }
                },
                add_callback : function(callback) { dpd_comms.callbacks.push(callback); },
                add_sender : function(sender) {
                    this.senders.push(sender);
                    var toSend = this.messages;
                    this.messages = [];
                    for(var i in toSend) {
                        this.send(toSend[i]);
                    }
                },
                callbacks : [],
                senders: [],
                messages: []
            };
            var callback_function = function(message) { global.dpd_comms.receive(message); }
            var w = window;
            while( w )
            {
                if( w.dpd_wsb ) {
                    w.dpd_wsb.add_callback(callback_function);
                    global.dpd_comms.add_sender(w.dpd_wsb);
                } else {
                    // No global yet, store callbacks for later registration
                    if( !w.dpd_wsb_pre )
                    {
                        w.dpd_wsb_pre = { callbacks: [],
                                          sender_targets: []};
                    }
                    w.dpd_wsb_pre.callbacks.push(callback_function);
                    w.dpd_wsb_pre.sender_targets.push(global.dpd_comms);
                }
                if( w != window.parent )
                    w = window.parent;
                else
                    w = null;
            }
        }
        global.dpd_comms.add_callback(this.handleMessage.bind(this));
        this.send_info();
    }
    send_info() {
        global.dpd_comms.send({'type':'connection_triplet',
                               'uid':this.props.uid,
                               'label':this.props.label,
                               'channel_name':this.props.channel_name});
    }
    handleMessage(e) {
        if( e.label == this.props.label && this.props.setProps ){
            this.props.setProps({value:e.value});
        }
    }
    render() {
        return null;
    }
}

Pipe.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * The UID used to identify this component instance in the backend. Changes are not propagated.
     */
    uid: PropTypes.string,

    /**
     * The label for messages that the component should absorb.
     */
    label: PropTypes.string,

    /**
     * The back-end channel name for sourcing messages. Changes are not propagated to the backend.
     */
    channel_name: PropTypes.string,

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
