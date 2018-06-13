import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class DPDirectComponent extends Component {
    render() {
        return <div id={id}>This is the direct component at {path}</div>;
    }
}

DPDirectComponent.propTypes = {
    id: PropTypes.string,
    path: PropTypes.string,

    setProps: PropTypes.func
}
