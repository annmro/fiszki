
import types from '../types'

export default function deckStoreReducer(state = { decks: [] }, action) {
    switch (action.type) {
        case types.ADD_DECK:
            return {
                ...state, decks: [...state.decks, action.deck]
            }
        case types.SET_ALL_DECKS:
            return {
                ...state,
                //decks: [...state.decks, action.decks] // -> [[.......]] // bad
                decks: [...action.decks] // -> [.......] // ok
            }
        case types.DELETE_DECK:
            return {
                ...state,
                decks: state.decks.filter(deck => deck.id !== action.deckId)
            }

        case types.SAVE_DECK:
            return {
                ...state,
                decks: [...(state.decks.filter(deck => deck.id !== action.deck.id)), action.deck]
            }
        default:
            return state
    }
}
