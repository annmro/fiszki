import React, { Component } from 'react';
import RegisterUserComponent from './RegisterUserComponent';
import LogInUserComponent from './LogInUserComponent';



interface UserComponentProps {
    flag: string,
    setFlag: (flag: string) => void,
}


class UserComponent extends Component<UserComponentProps, any> {


    openDialogRegisterIn = () => {
        this.props.setFlag("RegIn");
    }

    closeDialogRegisterIn = () => {
        this.props.setFlag("None");
    }

    closeDialogRegisterInAndShowLogin = () => {
        this.props.setFlag("LogIn");
    }

    render() {
        return (
            <div>
                <LogInUserComponent
                    isVisible={this.props.flag === "LogIn"}
                    setFlag={this.props.setFlag}
                ></LogInUserComponent>
                <RegisterUserComponent
                    isVisible={this.props.flag === "RegIn"}
                    setFlag={this.props.setFlag}
                ></RegisterUserComponent>
            </div>
        )
    }
}

export default UserComponent;