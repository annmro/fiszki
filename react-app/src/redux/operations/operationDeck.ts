import { getFetchDefaults, getHeadersJson } from '../../helpers/requestHelpers'
import DeckDto from '../../modelsDto/deckDto';
import { addDeck, setDecks, deleteDeck, saveEditDeck } from '../action'

const fetchDecks = async (idUser: string) => {
    const fetch = getFetchDefaults();
    const response = await fetch(`/api/getDecks`, {
        method: 'GET',
        headers: getHeadersJson(idUser)
    });
    const json = await response.json()
    return json;
}

export const getAllDecks = (idUser: string) => {
    return async (dispatch: any) => {
        const decks = await fetchDecks(idUser);
        dispatch(setDecks(decks));
    }
}

const fetchAddDeck = async (deck: DeckDto) => {
    const fetch = getFetchDefaults();
    await fetch('/api/addDeck', {
        method: 'POST',
        body: JSON.stringify(deck),
        headers: getHeadersJson(deck.idUser),
    })
}

export const addDeckToStore = (deck: DeckDto) => {
    return async (dispatch: any) => {
        await fetchAddDeck(deck);
        dispatch(addDeck(deck));
    }
}

const fetchDeleteDeck = async (deckId: string, idUser: string) => {
    const fetch = getFetchDefaults();
    await fetch(`/api/deleteDeck?id=${deckId}`, {
        method: 'DELETE',
        headers: getHeadersJson(idUser)
    })
}

export const deleteDeckFromStore = (deckId: string, idUser: string) => {
    return async (dispatch: any) => {
        await fetchDeleteDeck(deckId, idUser);
        dispatch(deleteDeck(deckId));
    }
}

const fetchEditDeck = async (deck: DeckDto) => {
    const fetch = getFetchDefaults();
    await fetch('/api/saveEditDeck', {
        method: 'POST',
        body: JSON.stringify(deck),
        headers: getHeadersJson(deck.idUser)
    })
}

export const saveEditDeckStore = (deck: DeckDto) => {
    return async (dispatch: any) => {
        await fetchEditDeck(deck)
        dispatch(saveEditDeck(deck));
    }
}