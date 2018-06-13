import React, {Component} from 'react';
import {DPDynamicComponent} from '../src';

class Demo extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            source: 'freda'
        }
    }
    setTheState(newProps) {
        var ns = { };
        if( newProps.value ) {ns.value = newProps.value; }
        if( newProps.source ) {ns.source = newProps.source;}
        this.setState(ns);
    }
    render() {
        return (
            <div>
                <h1>dpd-components Demo</h1>

                <hr/>
                <h2>DPDynamicComponent</h2>
                <DPDynamicComponent
                    source={this.state.source}
                    value={this.state.value}
                    setProps={this.setTheState.bind(this)}
                />
                <hr/>
            </div>
        );
    }
}

export default Demo;
