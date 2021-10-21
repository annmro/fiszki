import React, { Component } from 'react';
import UserDto from '../../modelsDto/userDto'
import md5 from 'md5'
import { connect } from 'react-redux';
import { logInUser } from '../../redux/operations/operationUser'
import { getAllCards } from '../../redux/operations/operationCard'
import { getAllDecks } from '../../redux/operations/operationDeck'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import UserInfoDto from '../../modelsDto/userInfoDto';
import { Divider, Grid } from '@mui/material';
import Link from '@mui/material/Link';
import image from './../../styles/undraw_Login_re_4vu2.svg';
import './../../styles/Image.css'



interface LogInUserComponentState {
    login: string,
    password: string,
    loggedUserId: string | null,
    isInputLoginShowValue: boolean,
    isInputPasswordShowValue: boolean,
    alertInfoOpen: boolean,
    isLogSukcess: boolean,
    isLogInVisible: boolean
}
interface LogInUserComponentProps {
    isVisible: boolean,
    setFlag: (flag: string) => void,
    getAllCardsLoc: (userId: string) => void;
    getAllDecksLoc: (userId: string) => void;
    logInUserLoc: (user: UserDto, callback: (user: UserInfoDto | null) => void) => void;
}

class LogInUserComponent extends Component<LogInUserComponentProps, LogInUserComponentState> {

    state = {
        login: "",
        password: "",
        loggedUserId: null,
        isInputLoginShowValue: true,
        isInputPasswordShowValue: true,
        alertInfoOpen: false,
        isLogSukcess: false,
        isLogInVisible: false
    }

    handleLoginInputChange = (e: any) => {
        const value = e.target.value;
        this.setState({
            login: value,
            isInputLoginShowValue: value !== ""
        })
    }

    handlePasswordInputChange = (e: any) => {
        const value = e.target.value;
        this.setState({
            password: value,
            isInputPasswordShowValue: value !== ""
        })
    }

    handleLogUser = async () => {
        const { login, password } = this.state
        if (login === "") {
            this.setState({
                isLogSukcess: false,
                alertInfoOpen: true
            })
            return;
        } else if (password === "") {
            this.setState({
                isLogSukcess: false,
                alertInfoOpen: true
            })
            return;
        } else {
            const user: UserDto = {
                id: null,
                login: this.state.login,
                passHash: md5(this.state.password)
            };

            this.props.logInUserLoc(user, (userInfoDto: UserInfoDto | null) => {
                if (userInfoDto !== null) {
                    this.props.getAllCardsLoc(userInfoDto.id);
                    this.props.getAllDecksLoc(userInfoDto.id);
                    this.setState({
                        isLogSukcess: true,
                        isLogInVisible: false,
                        alertInfoOpen: true
                    })
                } else {
                    this.setState({
                        isLogSukcess: false,
                        isLogInVisible: false,
                        alertInfoOpen: true
                    })
                }
            })
            this.props.setFlag("None")
        }
    }
    handleRegisterNewUser = () => {
        this.props.setFlag("RegIn");
    }

    handleClose = (event: React.SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            alertInfoOpen: false
        })
    }

    handleOnClose = () => {
        this.setState({
            login: "",
            password: "",
        })
        this.props.setFlag("None")
    }

    render() {
        const { isInputLoginShowValue, isInputPasswordShowValue, isLogSukcess } = this.state
        return (<div>

            <Dialog
                open={this.props.isVisible}
                onClose={this.handleOnClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Logowanie użytkownika
                </DialogTitle>
                <Grid container spacing={2}>
                    <Grid container direction="column" item xs={6}>
                        <img className="logInImage" src={image} alt="logInPicture" />
                    </Grid>
                    <Grid container direction="column" item xs={6}>
                        <DialogContent>
                            <TextField
                                error={!isInputLoginShowValue}
                                id={isInputLoginShowValue ? "standard-basic" : "standard-error-helper-text"}
                                label="Login"
                                helperText={isInputLoginShowValue ? null : "Pole nie może być puste!"}
                                type="text"
                                onChange={this.handleLoginInputChange} />
                            <br />
                            <br />
                            <TextField
                                error={!isInputPasswordShowValue}
                                id={isInputPasswordShowValue ? "standard-basic" : "standard-error-helper-text"}
                                label="Hasło"
                                helperText={isInputPasswordShowValue ? null : "Pole nie może być puste!"}
                                type="password"
                                onChange={this.handlePasswordInputChange} />
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="primary" onClick={this.handleLogUser} >Zaloguj</Button>
                        </DialogActions>
                        <br />
                    </Grid>
                </Grid>

                <Divider />
                <DialogActions>
                    <Link
                        component="button"
                        variant="body2"
                        underline="hover"
                        color="inherit"
                        onClick={this.handleRegisterNewUser}
                    >Nie masz konta? Zarejestruj się!</Link>
                </DialogActions>
            </Dialog>
            {/* <br />
            <br /> */}
            <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'top' }} open={this.state.alertInfoOpen} autoHideDuration={3000} onClose={this.handleClose}>
                <Alert onClose={this.handleClose} variant="filled" severity={isLogSukcess ? "success" : "warning"}>
                    {isLogSukcess ? "Udane Logowanie!" : "Logowanie nie powiodło się, nie uzupełniono wszystkich danych lub użytkownik o takim loginie już istnieje"}
                </Alert>
            </Snackbar>
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    logInUserLoc: (user: UserDto, callback: (user: UserInfoDto | null) => void) => dispatch(logInUser(user, callback)),
    getAllCardsLoc: (userId: string) => dispatch(getAllCards(userId)),
    getAllDecksLoc: (userId: string) => dispatch(getAllDecks(userId))
})

export default connect(null, mapDispatchToProps)(LogInUserComponent);