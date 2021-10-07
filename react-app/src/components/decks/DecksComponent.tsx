
import React, { Component } from 'react';
import AddEditDeckComponent from './AddEditDeckComponent'
import DecksListComponent from './DecksListComponent'
import Button from '@material-ui/core/Button';
import DeckDto from '../../modelsDto/deckDto';

interface DeckComponentState {
    isAddEditDeckVisible: boolean,
    selectedDeck: DeckDto | null,
}

class DecksComponent extends Component<any, DeckComponentState> {

    state = {
        isAddEditDeckVisible: false,
        selectedDeck: null
    }

    handleAddDeckClick = () => {
        this.setState({
            isAddEditDeckVisible: !this.state.isAddEditDeckVisible,
            selectedDeck: null
        })
    }

    handleEdit = (deck: DeckDto) => {
        this.setState({
            isAddEditDeckVisible: true,
            selectedDeck: deck
        })
    }

    closeDialog = () => {
        this.setState(prevState => ({
            isAddEditDeckVisible: false,
        })
        )
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleAddDeckClick}>Dodaj</Button>
                <AddEditDeckComponent
                    isVisible={this.state.isAddEditDeckVisible}
                    selectedDeck={this.state.selectedDeck}
                    closeDialog={this.closeDialog} />
                <br />
                <br />
                <DecksListComponent handleEdit={this.handleEdit} />
            </div>
        )
    }
}

export default DecksComponent;