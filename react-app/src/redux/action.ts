import CardDto from "../modelsDto/cardDto";
import DeckDto from "../modelsDto/deckDto";
import UserDto from "../modelsDto/userDto";
import UserInfoDto from "../modelsDto/userInfoDto";
import types from "./types";

export const setCards = (cards: Array<CardDto>) => {
    return {
        type: types.SET_ALL_CARDS,
        cards: cards
    }
}

export const addCard = (card: CardDto) => {
    return {
        type: types.ADD_CARD, card
    }
}

export const deleteCard = (cardId: string) => {
    return {
        type: types.DELETE_CARD, cardId
    }
}

export const addDeck = (deck: DeckDto) => {
    return {
        type: types.ADD_DECK, deck
    }
}

export const setDecks = (decks: Array<DeckDto>) => {
    return {
        type: types.SET_ALL_DECKS,
        decks: decks
    }
}

export const deleteDeck = (deckId: string) => {
    return {
        type: types.DELETE_DECK, deckId
    }
}

export const saveEditCard = (card: CardDto) => {
    return {
        type: types.SAVE_CARD,
        card
    }
}
export const saveEditDeck = (deck: DeckDto) => {
    return {
        type: types.SAVE_DECK,
        deck
    }
}

export const setUser = (user: UserInfoDto | UserDto | null) => {
    return {
        type: types.SET_USER,
        user
    }
}