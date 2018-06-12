import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class DPDynamicComponent extends Component {
    render() {
        const {id, setProps, tagname} = this.props;
        return (<div id={id}>
                  DPDynamic for {tagname}
                  <input value={tagname} onChange={e => { if(setProps) { setProps({tagname:e.target.tagname}); } }}/>
                </div>
               );
    }
}

DPDynamicComponent.propTypes = {
    id: PropTypes.string,
    tagname: PropTypes.string,
    setProps: PropTypes.func
}
