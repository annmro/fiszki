import types from '../types'

export default function userStoreReducer(state = { user: null }, action) {
    switch (action.type) {
        case types.SET_USER:
            return {
                ...state, user: action.user
            }
        default:
            return state
    }
}
