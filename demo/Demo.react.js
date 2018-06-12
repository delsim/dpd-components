import React, {Component} from 'react';
import {DPDynamicComponent} from '../src';

class Demo extends Component {
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    render() {
        return (
            <div>
                <h1>dpd-components Demo</h1>

                <hr/>
                <h2>DPDynamicComponent</h2>
                <DPDynamicComponent
                    source="This is an example label"
                    value={this.state.value}
                    setProps={newProps => this.setState({value: newProps.value})}
                />
                <hr/>
            </div>
        );
    }
}

export default Demo;
