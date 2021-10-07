import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';
import DeckDto from '../../modelsDto/deckDto'
import { addDeckToStore, saveEditDeckStore } from '../../redux/operations/operationDeck'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Alert } from '@material-ui/lab';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';
import UserDto from '../../modelsDto/userDto';
import { AppStore } from '../../models/FiszkiState';

interface AddEditDeckComponentState {
    deckName: string,
    isDeckNameShowError: boolean,
    alertInfo: boolean
}
interface AddEditDeckComponentProps {
    isVisible: boolean,
    selectedDeck: DeckDto | null,
    saveEditDeckLoc: (editDeck: DeckDto) => void,
    addDeckLoc: (deck: DeckDto) => void,
    stateUserLoc: UserDto | null,
    closeDialog: () => void,
}

class AddEditDeckComponent extends Component<AddEditDeckComponentProps, AddEditDeckComponentState> {

    state = {
        deckName: "",
        isDeckNameShowError: true,
        alertInfo: false
    }

    componentDidUpdate(prevProps: Readonly<AddEditDeckComponentProps>) {
        if (this.props.selectedDeck !== prevProps.selectedDeck) {
            this.setState({
                deckName: this.props.selectedDeck === null ? "" : this.props.selectedDeck.name,
            })
        }
    }

    handleDeckNameChange = (e: any) => {
        const value = e.target.value;
        this.setState({
            deckName: value,
            isDeckNameShowError: value !== ""
        })
    }

    handleClickSave = () => {
        if (this.state.deckName === "") {
            this.setState({
                isDeckNameShowError: false
            })
            return;
        }
        if (this.isEdit()) {
            const editDeck = this.props.selectedDeck;

            if (editDeck !== null) {
                editDeck.name = this.state.deckName;
                this.props.saveEditDeckLoc(editDeck)
            }

        } else {
            if (this.props.stateUserLoc !== null) {

                const deck: DeckDto = {
                    id: uuid(),
                    name: this.state.deckName,
                    idUser: this.props.stateUserLoc.id,
                    cards: null
                }
                this.props.addDeckLoc(deck);
                this.setState({
                    alertInfo: true
                })
            }
            this.handleOnClose()
        }
    }

    isEdit = () => {
        if (this.props.selectedDeck === null || this.props.selectedDeck === undefined) {
            return false;
        } else {
            return true;
        }
    }

    handleOnClose = () => {
        this.setState({
            deckName: ""
        })
        this.props.closeDialog();
    }
    handleClose = (event: React.SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            alertInfo: false
        })
    };

    render() {

        return (
            <div>
                <Dialog
                    open={this.props.isVisible}
                    onClose={this.handleOnClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth='xs'
                    fullWidth>
                    <DialogTitle id="form-dialog-title">{this.isEdit() ? "Edycja talii" : "Dodawanie talii"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="normal"
                            fullWidth
                            error={!this.state.isDeckNameShowError}
                            id={this.state.isDeckNameShowError ? "standard-basic" : "standard-error-helper-text"}
                            label="Nazwa"
                            helperText={this.state.isDeckNameShowError ? null : "Pole nie może być puste!"}
                            value={this.state.deckName}
                            onChange={this.handleDeckNameChange} />
                        <DialogActions>
                            <Button
                                variant="contained" color="primary"
                                onClick={this.handleOnClose}>
                                Anuluj
                            </Button>
                            <Button
                                variant="contained" color="primary"
                                onClick={this.handleClickSave}>
                                {this.isEdit() ? "Zapisz zmiany" : "Zapisz"}
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
                <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'top' }} open={this.state.alertInfo} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert variant="filled" onClose={this.handleClose} severity="success">
                        Nowa talia została dodana!
                    </Alert>
                </Snackbar>
            </div>
        );
    }

}

const mapStateToProps = (state: AppStore) => ({
    decksLoc: state.decks.decks,
    stateUserLoc: state.user.user
})

const mapDispatchToProps = (dispatch: any) => ({
    addDeckLoc: (deck: DeckDto) => dispatch(addDeckToStore(deck)),
    saveEditDeckLoc: (deck: DeckDto) => dispatch(saveEditDeckStore(deck))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddEditDeckComponent);