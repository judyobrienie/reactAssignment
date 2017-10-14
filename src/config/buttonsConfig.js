// JavaScript source code
import React, {Component, PropTypes } from 'react';

class Button extends Component {
    static propTypes = {
        email: PropTypes.string.isRequired,
        formValues: PropTypes.shape({
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
        }).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
        };
        this.logFormDataToConsole
    }




logFormDataToConsole(event){
    console.log(this.props.formValues);
}

render() {
        const recipient = 'mailto:${this.props.email}';
        const subject= '?subject=Interested%20Client';
        const body = '&body=${this.props.formValues.message }';
        return (
            <a
                href={'${recipient}${subject}&{body}'}
                onClick={this.logFormDataToConsole}

            onClick={this.logFormDataToConsole}
                    >

                    Contact US
        </a >
        
        );
    }
}



export default Button;