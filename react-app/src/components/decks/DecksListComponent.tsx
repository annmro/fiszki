import React, { Component } from 'react';
import { deleteDeckFromStore } from '../../redux/operations/operationDeck'
import { connect } from 'react-redux';
import { getAllDecks } from '../../redux/operations/operationDeck'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//import '../../styles/Main.css';
import { Alert } from '@material-ui/lab';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DeckDto from '../../modelsDto/deckDto';
import { AppStore } from '../../models/FiszkiState'
import UserDto from '../../modelsDto/userDto';


interface DecksListComponentState {
    alertDeleteInfo: boolean,
    validationBeforeDeleteDeck: boolean,
    activeRowId: string | null,
    activeRowUserId: string | null
}
interface DecksListComponentProps {
    deleteDeckLoc: (deckId: string, idUser: string) => void;
    handleEdit: (deck: DeckDto) => void;
    decksLoc: Array<DeckDto>,
    stateUserLoc: UserDto,


}

class DecksListComponent extends Component<DecksListComponentProps, DecksListComponentState> {

    state = {
        alertDeleteInfo: false,
        validationBeforeDeleteDeck: false,
        activeRowId: null,
        activeRowUserId: null
    }

    handleRemoveClick = () => {
        if (this.state.activeRowId && this.state.activeRowUserId) {
            this.props.deleteDeckLoc(this.state.activeRowId, this.state.activeRowUserId)
            this.setState({
                alertDeleteInfo: true
            })
            this.handleCloseValidationDialog()
        }
    }

    handleEditDeckClick = (deck: DeckDto) => {
        this.props.handleEdit(deck)
    }

    openValidationDialog = (id: string, idUser: string | null) => {
        this.setState({
            validationBeforeDeleteDeck: true,
            activeRowId: id,
            activeRowUserId: idUser
        })
    }

    handleCloseValidationDialog = () => {
        this.setState({
            validationBeforeDeleteDeck: false,
            activeRowId: null,
            activeRowUserId: null
        })
    }
    handleClose = (event: React.SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            alertDeleteInfo: false
        })
    };

    render() {
        return (
            <div>
                {this.props.decksLoc !== undefined && this.props.decksLoc !== null ? <TableContainer
                    style={{ maxWidth: "1000px" }}

                    component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Nazwa Talii</TableCell>
                                <TableCell align="left">Ilość kart</TableCell>
                                <TableCell align="left">Opcje</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.decksLoc.map((row, index) => (
                                <TableRow key={index}>
                                    {/* <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell> */}
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.cards === null || row.cards === undefined ? "0" : row.cards.length}</TableCell>
                                    <TableCell align="left">
                                        <IconButton
                                            color="primary"
                                            size="medium"
                                            onClick={() => this.openValidationDialog(row.id, row.idUser)}
                                        >
                                            <Icon>delete
                                            </Icon>
                                        </IconButton>
                                        <IconButton
                                            color="primary"
                                            size="medium"
                                            onClick={() => this.handleEditDeckClick(row)}>
                                            <Icon>edit
                                            </Icon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> : null}
                <Dialog
                    open={this.state.validationBeforeDeleteDeck}
                    onClose={this.handleCloseValidationDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Usuwanie talii"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Czy na pewno chcesz usunąć wybraną talię?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseValidationDialog} color="primary" autoFocus>
                            Anuluj
                        </Button>
                        <Button onClick={this.handleRemoveClick} color="primary">
                            Usuń
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'top' }} open={this.state.alertDeleteInfo} autoHideDuration={2000} onClose={this.handleClose}>
                    <Alert variant="filled" onClose={this.handleClose} severity="success">
                        Wybrana talia została usunięta!
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStore) => ({
    decksLoc: state.decks.decks,
    stateUserLoc: state.user.user
})

const mapDispatchToProps = (dispatch: any) => ({
    getAllDecksLoc: (idUser: string) => dispatch(getAllDecks(idUser)),
    deleteDeckLoc: (deckId: string, idUser: string) => dispatch(deleteDeckFromStore(deckId, idUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DecksListComponent)