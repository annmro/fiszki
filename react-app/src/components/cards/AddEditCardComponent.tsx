import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCardToStore, saveEditCardStore } from '../../redux/operations/operationCard'
import CardDto from '../../modelsDto/cardDto'
import { v4 as uuid } from 'uuid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Alert } from '@material-ui/lab';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AppStore } from '../../models/FiszkiState';
import DeckDto from '../../modelsDto/deckDto';
import UserDto from '../../modelsDto/userDto';



interface AddEditCardState {
    cardAverse: string,
    cardReverse: string,
    cardIdDeck: string,
    alertInfo: boolean,
    // alertDeleteInfo: boolean,
    isCardAverseShowValue: boolean,
    isCardReverseShowValue: boolean,
    isCardDeckNameShowValue: boolean
}

interface AddEditCardProps {
    selectedCard: CardDto | null,
    saveEditCardLoc: (editCard: CardDto) => void,
    addCardLoc: (editCard: CardDto) => void,
    decksLoc: Array<DeckDto>,
    stateUserLoc: UserDto,
    closeDialog: () => void,
    isVisible: boolean,
}

class AddEditCardComponent extends Component<AddEditCardProps, AddEditCardState> {
    state = {
        cardAverse: "",
        cardReverse: "",
        cardIdDeck: "",
        alertInfo: false,
        // alertDeleteInfo: false,
        isCardAverseShowValue: true,
        isCardReverseShowValue: true,
        isCardDeckNameShowValue: true
    }

    componentDidUpdate(prevProps: Readonly<AddEditCardProps>,) {
        if (this.props.selectedCard !== prevProps.selectedCard) {
            this.setState({
                cardAverse: this.props.selectedCard === null ? "" : this.props.selectedCard.front,
                cardReverse: this.props.selectedCard === null ? "" : this.props.selectedCard.back,
                cardIdDeck: this.props.selectedCard === null ? "" : this.props.selectedCard.idDeck,
            })
        }
    }

    handleFrontCardChange = (e: any) => {
        const valueFront = e.target.value;
        this.setState({
            cardAverse: valueFront,
            isCardAverseShowValue: valueFront !== ""
        })
    }

    handleBackCardChange = (e: any) => {
        const valueBack = e.target.value;
        this.setState({
            cardReverse: valueBack,
            isCardReverseShowValue: valueBack !== ""
        })
    }
    handleIdDeckChange = (e: any) => {
        const valueIdDeck = e.target.value;
        this.setState({
            cardIdDeck: valueIdDeck,
            isCardDeckNameShowValue: valueIdDeck !== ""
        })
    }

    handleClickSave = () => {

        if (this.state.cardAverse === "") {
            this.setState({
                isCardAverseShowValue: false
            })
            return;
        } else if (this.state.cardReverse === "") {
            this.setState({
                isCardReverseShowValue: false
            })
            return;
        } else if (this.state.cardIdDeck === "") {
            this.setState({
                isCardDeckNameShowValue: false
            })
            return;
        }

        if (this.isEdit()) {
            const editCard = this.props.selectedCard;
            if (editCard !== null) {
                editCard.front = this.state.cardAverse;
                editCard.back = this.state.cardReverse;
                editCard.idDeck = this.state.cardIdDeck;
                this.props.saveEditCardLoc(editCard)
            }

        } else {
            if (this.props.stateUserLoc !== null) {
                const card: CardDto = {
                    id: uuid(),
                    front: this.state.cardAverse,
                    back: this.state.cardReverse,
                    idDeck: this.state.cardIdDeck,
                    idUser: this.props.stateUserLoc.id,
                    reviewDate: null,
                    lastDaysToReview: null,
                }
                this.props.addCardLoc(card);
                this.setState({
                    alertInfo: true
                })
            }
        }
        this.handleOnClose()
    }

    isEdit = () => {
        if (this.props.selectedCard === null || this.props.selectedCard === undefined) {
            return false;
        } else {
            return true;
        }
    }
    handleOnClose = () => {
        this.setState({
            cardAverse: "",
            cardReverse: "",
            cardIdDeck: "",
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
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">{this.isEdit() ? "Edycja karty" : "Dodawanie karty"}</DialogTitle>
                    <DialogContent >
                        <TextField fullWidth
                            margin="normal"
                            error={!this.state.isCardAverseShowValue}
                            id={this.state.isCardAverseShowValue ? "standard-basic" : "standard-error-helper-text"}
                            label="Słowo"
                            helperText={this.state.isCardAverseShowValue ? null : "Pole nie może być puste!"}
                            value={this.state.cardAverse}
                            onChange={this.handleFrontCardChange} />
                        <br />
                        <TextField fullWidth
                            margin="normal"
                            error={!this.state.isCardReverseShowValue}
                            id={this.state.isCardReverseShowValue ? "standard-basic" : "standard-error-helper-text"}
                            label="Tłumaczenie"
                            helperText={this.state.isCardReverseShowValue ? null : "Pole nie może być puste!"}
                            value={this.state.cardReverse}
                            onChange={this.handleBackCardChange} />
                        <br />

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">Talia</InputLabel>
                            <Select
                                error={!this.state.isCardDeckNameShowValue}
                                id={this.state.isCardDeckNameShowValue ? "demo-simple-select" : "demo-simple-select-error"}
                                labelId="demo-simple-select-label"
                                //helperText={this.state.isCardDeckNameShowValue ? null : "Pole nie może być puste!"}
                                value={this.state.cardIdDeck}
                                onChange={this.handleIdDeckChange}
                            >{this.props.decksLoc.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <br />
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
                        Nowa karta została dodana!
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
    addCardLoc: (card: CardDto) => dispatch(addCardToStore(card)),
    saveEditCardLoc: (card: CardDto) => dispatch(saveEditCardStore(card))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddEditCardComponent);
