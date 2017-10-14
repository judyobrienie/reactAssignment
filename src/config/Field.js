//dependencies
import PropTypes from 'prop-types';
import React from 'react';



//stateless component / functional component
const Field = (props) => (
    <div>
    <label>{props.label}</label>
    <input
        onChange={props.onChange}
        type={props.textarea ? 'textarea' : 'text'}
        value={props.value}
    />
    </div>
    );


//to ensure certain props to enable hte component to function properly
Field.PropTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    textarea: PropTypes.bool.isRequired,


};


Field.defaultProps = {
    textarea: false,
};



export default Field;