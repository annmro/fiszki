import decks from './DecksStore'
import cards from './CardsStore'
import user from './UsersStore'

import { combineReducers } from 'redux'

export default combineReducers({
    decks,
    cards,
    user
})
