import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCards } from '../../redux/operations/operationCard'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { deleteCardFromStore } from '../../redux/operations/operationCard'
// import '../../styles/Main.css';
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
import CardDto from '../../modelsDto/cardDto';
import UserDto from '../../modelsDto/userDto';
import { AppStore } from '../../models/FiszkiState';


interface CardListState {
    validationBeforeDeleteCard: boolean,
    alertDeleteInfo: boolean,
    activeRowId: string | null,
    activeUserId: string | null,
    alertEditCardInfo: boolean
}

interface CardListProps {
    cardsLoc: Array<CardDto>,
    stateUserLoc: UserDto,
    deleteCardLoc: (activeRowId: string, activeUserId: string) => void,
    handleEdit: (card: CardDto) => void,
    getAllCardsLoc: (userId: string) => void,
}

class CardsList extends Component<CardListProps, CardListState>{
    state = {
        validationBeforeDeleteCard: false,
        alertDeleteInfo: false,
        activeRowId: null,
        activeUserId: null,
        alertEditCardInfo: false
    }

    handleRemoveClick = () => {
        const { activeRowId, activeUserId } = this.state
        if (activeRowId && activeUserId) {
            this.props.deleteCardLoc(activeRowId, activeUserId)
            this.setState({
                alertDeleteInfo: true
            })
            this.handleCloseValidationDialog();
        }
    }

    openValidationDialog = (id: string, idUser: string | null) => {
        this.setState({
            validationBeforeDeleteCard: true,
            activeRowId: id,
            activeUserId: idUser
        })
    }

    handleCloseValidationDialog = () => {
        this.setState({
            validationBeforeDeleteCard: false,
            activeRowId: null,
            activeUserId: null
        })
    }

    handleEditCardClick = (card: CardDto) => {
        this.props.handleEdit(card);
        this.setState({
            alertEditCardInfo: true
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
            <>
                {this.props.cardsLoc !== undefined && this.props.cardsLoc !== null &&
                    <TableContainer style={{ maxWidth: "1000px" }} component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Przód</TableCell>
                                    <TableCell align="left">Tył</TableCell>
                                    <TableCell align="left">Opcje</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.cardsLoc.map((row: CardDto, index: number) => (
                                    <TableRow key={index}>


                                        <TableCell align="left">{row.front}</TableCell>
                                        <TableCell align="left">{row.back}</TableCell>
                                        <TableCell align="left">
                                            <IconButton
                                                color="primary"
                                                size="small"
                                                onClick={() => this.openValidationDialog(row.id, row.idUser)}>
                                                <Icon>delete
                                                </Icon>
                                            </IconButton>
                                            <IconButton
                                                color="primary"
                                                size="small"
                                                onClick={() => this.handleEditCardClick(row)}>
                                                <Icon>edit
                                                </Icon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}
                <Dialog
                    open={this.state.validationBeforeDeleteCard}
                    onClose={this.handleCloseValidationDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Usuwanie talii"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Czy na pewno chcesz usunąć wybraną kartę?
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
                        Wybrana karta została usunięta!
                    </Alert>
                </Snackbar>
            </>
        );
    }
}

const mapStateToProps = (state: AppStore) => ({
    cardsLoc: state.cards.cards,
    stateUserLoc: state.user.user
})

const mapDispatchToProps = (dispatch: any) => ({
    getAllCardsLoc: (userId: string) => dispatch(getAllCards(userId)),
    deleteCardLoc: (cardId: string, idUser: string) => dispatch(deleteCardFromStore(cardId, idUser))
})


export default connect(mapStateToProps, mapDispatchToProps)(CardsList)

