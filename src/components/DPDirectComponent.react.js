/* eslint-disable no-undef */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class DPDirectComponent extends Component {
    render() {
        return <div id={this.props.id}>This is the direct component at {this.props.path}</div>;
    }
}

DPDirectComponent.propTypes = {
    id: PropTypes.string,
    path: PropTypes.string,

    setProps: PropTypes.func
}
