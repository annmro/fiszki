import CardDto from "../modelsDto/cardDto";
import DeckDto from "../modelsDto/deckDto";
import UserDto from "../modelsDto/userDto";


export interface CardsStore {
    cards: Array<CardDto>,
}

export interface DecksStore {
    decks: Array<DeckDto>,
}

export interface UserStore {
    user: UserDto,
}

export interface AppStore {
    cards: CardsStore,
    decks: DecksStore,
    user: UserStore,
}