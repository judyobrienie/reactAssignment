
import React from "react";
import LoginForm from "./loginForm";

class Login extends React.Component {
    
    
 submit = (data) => {
        console.log(data);
    };

    render() {
        return(
        <div>
            <h1>Login</h1>

            <LoginForm submit={this.subit}/>
        </div> 
        );
    }
}




export default Login;



/* www.youtube.com/watch?v=NO2DaxhoWHk&t=623s
*/