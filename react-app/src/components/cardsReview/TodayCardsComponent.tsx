import React, { Component } from 'react';
import CardReviewComponent from './CardReviewComponent';
import { getCardsToTodayReview } from '../../redux/operations/operationCard'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { AppStore } from '../../models/FiszkiState';
import CardDto from '../../modelsDto/cardDto';
import { Paper } from '@mui/material';
import { size } from 'lodash'

interface TodayCardsComponentState {
    todayCards: Array<CardDto>,
    cardToReview: CardDto | null,
    isBackCardVisible: boolean,
    isCardVisible: boolean,
    hasCardsToReview: boolean | null,
}

class TodayCardsComponent extends Component<any, TodayCardsComponentState> {

    state = {
        todayCards: [],
        cardToReview: null,
        isBackCardVisible: false,
        isCardVisible: false,
        hasCardsToReview: null,
    }

    componentDidMount() {
        console.log("componentDidMount")
        const userId = this.props.stateUserLoc.id;
        getCardsToTodayReview(userId).then(res => {
            console.log("res", res);

            if (res.length === 0) {
                this.setState({
                    todayCards: [],
                    cardToReview: null,
                    isCardVisible: false,
                    hasCardsToReview: false,
                })
            } else {
                this.setState({
                    todayCards: res,
                    cardToReview: res[0],
                    hasCardsToReview: true,
                })
            }
        })
    }
    componentWillUnmount() {
        console.log("componentWillUnmount")
    }

    selectNewCardToReview = () => {
        if (this.state.todayCards !== null) {
            const newTable = this.state.todayCards.slice(1);
            //slice(this.state.todayCards, 1);
            this.setState({
                todayCards: newTable,
                cardToReview: newTable[0]
            })
        }
    }

    closeDialog = () => {
        this.setState(prevState => ({
            isCardVisible: false,
        })
        )
    }

    startReviewCard = () => {
        this.setState({
            isCardVisible: true
        })
    }

    render() {
        return (
            <div>
                {this.state.hasCardsToReview === null && <p>Pobieranie danych...</p>}
                {this.state.hasCardsToReview === false &&
                    <Paper
                        elevation={20}
                        component="h4"
                        sx={{
                            color: 'text.secondary',
                            fontSize: 25,
                            fontWeight: 'medium',
                            maxWidth: "70%",
                            alignItems: "center",
                            padding: "5%",
                            textAlign: "center"
                        }}> Nie ma dziś żadnych kart do powtórki
                    </Paper>}
                {this.state.hasCardsToReview === true && this.state.cardToReview !== null &&
                    <Paper
                        elevation={20}
                        component="h4"
                        sx={{
                            color: 'text.secondary',
                            fontSize: 25,
                            fontWeight: 'medium',
                            maxWidth: "70%",
                            alignItems: "center",
                            padding: "5%",
                            textAlign: "center"
                        }}> Ilość kart do powtórki na dziś: {size(this.state.todayCards)}
                        <br />
                        <br />
                        {size(this.state.todayCards) !== 0 &&
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={this.startReviewCard}>Rozpocznij naukę
                            </Button>}
                        {size(this.state.todayCards) === 0 && "GRATULACJE!! Wszystkie karty na dziś zostały powtórzone "}

                    </Paper>}



                {this.state.cardToReview !== null && this.state.cardToReview !== undefined &&
                    <CardReviewComponent
                        isVisible={this.state.isCardVisible}
                        cardToReview={this.state.cardToReview}
                        selectNewCardToReview={this.selectNewCardToReview}
                        closeDialog={this.closeDialog}
                        cardsToReview={this.state.todayCards}>
                    </CardReviewComponent>}
            </div>
        )
    }
}

const mapStateToProps = (state: AppStore) => ({
    stateUserLoc: state.user.user
})

export default connect(mapStateToProps, null)(TodayCardsComponent);