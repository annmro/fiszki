//główny komponent dla kart
import React, { Component } from 'react';
import CardsListComponent from "./CardsListComponent";
import AddEditCardComponent from './AddEditCardComponent';
import Button from '@material-ui/core/Button';
import CardDto from '../../modelsDto/cardDto';

interface CardsComponentState {
    isAddEditCardVisible: boolean,
    selectedCard: CardDto | null | undefined,
}


class CardsComponent extends Component<any, CardsComponentState>{
    state = {
        isAddEditCardVisible: false,
        selectedCard: null,
    }

    handleAddCardClick = () => {
        this.setState({
            isAddEditCardVisible: !this.state.isAddEditCardVisible,
            selectedCard: null
        })
    }
    handleEditCardClick = (card: CardDto) => {
        this.setState((prevState: Readonly<CardsComponentState>) => ({
            isAddEditCardVisible: true,
            selectedCard: card
        }),
            () => {
                console.log('setstate this.state.selectedCard', this.state.selectedCard);
            });
    }
    closeDialog = () => {
        this.setState(prevState => ({
            isAddEditCardVisible: false,
        })
        )
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleAddCardClick}>Dodaj</Button>
                <AddEditCardComponent
                    isVisible={this.state.isAddEditCardVisible}
                    selectedCard={this.state.selectedCard}
                    closeDialog={this.closeDialog} />
                <br />
                <br />
                <CardsListComponent
                    handleEdit={this.handleEditCardClick} />
            </div>
        )
    }
}
export default CardsComponent;