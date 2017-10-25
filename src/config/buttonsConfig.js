// JavaScript source code
import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {

    //var PropTypes = requre('prop-types'); 
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
        this.logFormDataToConsole = this.logFormDataToConsole.bind(this);
    }




logFormDataToConsole(event){
    console.log('Form Values', this.props.formValues);
    this.setState({isClicked:true})    //disable button when clicked
}

render() {
       // const recipient = 'mailto:${this.props.email}';
       // const subject= '?subject=Interested%20Client';
       // const body = '&body=${this.props.formValues.message }';
        return (
            <button
                href={'${recipient}${subject}&{body}'}
                disabled={this.state.isClicked}    //disable button when clicked
                onClick={this.logFormDataToConsole}
                    >

                    Contact US
            </button >
        
        );
    }
}



export default Button;