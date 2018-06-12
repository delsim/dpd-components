import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * DPDynamicComponent listens for messages and propagates them into the dash component
 */
export default class DPDynamicComponent extends Component {
    render() {
        const {id, setProps, source, value} = this.props;

        return (
            <div id={id}>
                DPDynamicComponent: {source}
                <input
                    value={value}
                    onChange={e => {
                        /*
                         * Send the new value to the parent component.
                         * In a Dash app, this will send the data back to the
                         * Python Dash app server.
                         */
                         if (setProps) {
                             setProps({
                                value: e.target.value
                            });
                         }
                    }}
                />
            </div>
        );
    }
}

DPDynamicComponent.propTypes = {
    /**
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
