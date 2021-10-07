
import types from '../types'

export default function cardStoreReducer(state = { cards: [] }, action) {
    console.log('action', action);
    switch (action.type) {
        case types.SET_ALL_CARDS:
            return {
                ...state,
                cards: [...action.cards]
            }
        case types.ADD_CARD:
            return {
                ...state,
                cards: [...state.cards, action.card]
            }
        case types.DELETE_CARD:
            return {
                ...state,
                cards: state.cards.filter(item => item.id !== action.cardId)
            }
        case types.SAVE_CARD:
            return {
                ...state,
                cards: [...(state.cards.filter(item => item.id !== action.card.id)), action.card]
            }
        default:
            return state
    }

}


