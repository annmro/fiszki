import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CardsList from '../components/cards/CardsComponent';
import StartPage from '../components/StartPageComponent';
import TodayCards from '../components/cardsReview/TodayCardsComponent';
import DecksList from '../components/decks/DecksComponent';
import User from '../components/user/UserComponent';
import { connect } from 'react-redux';
import { AppStore } from '../models/FiszkiState';
import UserDto from '../modelsDto/userDto';

interface MainProps {
    stateUserLoc?: UserDto,
}
class Main extends Component<MainProps, any> {
    render() {
        return (
            <div>
                <Route exact path='/' component={StartPage}></Route>
                <Route path='/todayCards' component={this.props.stateUserLoc ? TodayCards : StartPage}></Route>
                <Route path='/cards' component={this.props.stateUserLoc ? CardsList : StartPage}></Route>
                <Route path='/decks' component={this.props.stateUserLoc ? DecksList : StartPage}></Route>
                <Route path='/user' component={User}></Route>
            </div>
        );

    }
}

const mapStateToProps = (state: AppStore) => ({
    stateUserLoc: state.user.user
})
export default connect(mapStateToProps, null)(Main);