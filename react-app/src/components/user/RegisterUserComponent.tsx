import React, { Component } from 'react';
import { registerNewUser } from '../../redux/operations/operationUser';
import UserDto from '../../modelsDto/userDto'
import md5 from 'md5'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Alert } from '@material-ui/lab';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';
import { Grid } from '@mui/material';
import image from './../../styles/undraw_Sign_in_re_o58h.svg';
import './../../styles/Image.css'

interface RegisterUserComponentState {
    isRegisterSukcess: boolean,
    login: string,
    password: string,
    alertInfoOpen: boolean,
    isInputLoginShowValue: boolean,
    isInputPasswordShowValue: boolean
}

interface RegisterUserComponentProps {
    isVisible: boolean,
    setFlag: (flag: string) => void,
}

class RegisterUserComponent extends Component<RegisterUserComponentProps, RegisterUserComponentState> {

    state = {
        isRegisterSukcess: false,
        login: "",
        password: "",
        alertInfoOpen: false,
        isInputLoginShowValue: true,
        isInputPasswordShowValue: true
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

    handleRegisterUser = async () => {
        const { login, password } = this.state
        if (login === "") {
            this.setState({
                isRegisterSukcess: false,
                alertInfoOpen: true
            })
            return;
        } else if (password === "") {
            this.setState({
                isRegisterSukcess: false,
                alertInfoOpen: true
            })
            return;
        } else {
            const user: UserDto = {
                id: null,
                login: login,
                passHash: md5(password)
            }
            const response = await registerNewUser(user);
            this.setState({
                isRegisterSukcess: response === "true",
                alertInfoOpen: true
            })
            this.props.setFlag("LogIn");
        }
    }

    handleOnClose = () => {
        this.setState({
            login: "",
            password: "",
        })
        this.props.setFlag("None")
    }

    handleClose = (event: React.SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            alertInfoOpen: false
        })
    };

    render() {
        const { isRegisterSukcess, isInputLoginShowValue, isInputPasswordShowValue } = this.state

        return (<div>
            {/* <br />
            <br /> */}
            <Dialog
                open={this.props.isVisible}
                onClose={this.handleOnClose}
                aria-labelledby="form-dialog-title">
                <Grid container spacing={2}>
                    <Grid direction="column" item xs={5}>
                        <img className="regInImage" src={image} alt="regInPicture" />
                    </Grid>
                    <Grid direction="column" item xs={7}>
                        <DialogTitle id="form-dialog-title">Rejestracja użytkownika</DialogTitle>

                        <DialogContent>
                            <TextField
                                error={!isInputLoginShowValue}
                                id={isInputLoginShowValue ? "standard-basic" : "standard-error-helper-text"}
                                label="Login"
                                helperText={isInputLoginShowValue ? null : "Pole nie może być puste!"}
                                type="text"
                                onChange={this.handleLoginInputChange} />
                            <TextField
                                error={!isInputPasswordShowValue}
                                id={isInputPasswordShowValue ? "standard-basic" : "standard-error-helper-text"}
                                label="Hasło"
                                helperText={isInputPasswordShowValue ? null : "Pole nie może być puste!"}
                                type="password"
                                onChange={this.handlePasswordInputChange} />
                            <DialogActions>
                                <Button
                                    variant="contained" color="primary"
                                    onClick={this.handleOnClose}>
                                    Anuluj
                                </Button>
                                <Button
                                    variant="contained" color="primary"
                                    onClick={this.handleRegisterUser}>
                                    Zarejestruj
                                </Button>
                            </DialogActions>
                        </DialogContent>
                    </Grid>
                </Grid>
            </Dialog>
            <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'top' }} open={this.state.alertInfoOpen} autoHideDuration={3000} onClose={this.handleClose}>
                <Alert onClose={this.handleClose} variant="filled" severity={isRegisterSukcess ? "success" : "warning"}>{isRegisterSukcess ? "Konto zostało założone, zaloguj się!" : "Rejestracja nie powiodła się, nie uzupełniono wszystkich danych lub użytkownik o takim loginie już istnieje"}
                </Alert>
            </Snackbar>
        </div>
        )
    }
}

export default RegisterUserComponent;