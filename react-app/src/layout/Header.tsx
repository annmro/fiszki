import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOutUser } from '../redux/operations/operationUser'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import Icon from '@material-ui/core/Icon';
import { AppStore } from '../models/FiszkiState';
import UserDto from '../modelsDto/userDto';
import UserComponent from '../components/user/UserComponent';

interface HeaderState {
    flag: string,
}

interface HeaderProps {
    logOutUserLoc: Function,
    stateUserLoc?: UserDto | undefined
}

class Header extends Component<HeaderProps, HeaderState> {

    state = {
        flag: "None",
    }

    handleLogOutButton = () => {
        this.props.logOutUserLoc();
    }

    handleChangeVisibleUserDialog = () => {
        this.setState({
            flag: "LogIn"
        })
    }

    setFlag = (flag: string) => {
        this.setState({
            flag: flag
        })
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar >
                        <Typography> {this.props.stateUserLoc && `Zalogowano jako ${this.props.stateUserLoc.login}`}
                        </Typography>
                        {this.props.stateUserLoc !== null ?
                            <Button style={{ color: 'white', margin: "auto 10px auto auto" }} variant="outlined" href="/" onClick={this.handleLogOutButton}>Wyloguj</Button> :
                            <Button onClick={this.handleChangeVisibleUserDialog} style={{ color: 'white', margin: "auto 10px auto auto" }}
                            >Logowanie
                            </Button>}
                    </Toolbar>
                </AppBar>
                {<UserComponent
                    flag={this.state.flag}
                    setFlag={this.setFlag}
                />}
            </div>
        );
    }
}
const mapStateToProps = (state: AppStore) => ({
    stateUserLoc: state.user.user
})

const mapDispatchToProps = (dispatch: any) => ({
    logOutUserLoc: () => dispatch(logOutUser()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Header);