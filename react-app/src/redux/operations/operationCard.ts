import { getHeadersJson } from '../../helpers/requestHelpers';
import CardDto from '../../modelsDto/cardDto';
import { setCards, addCard, deleteCard, saveEditCard } from '../action'

const fetchCards = async (idUser: string) => {
    const response = await fetch(`/api/cards`, {
        method: 'GET',
        headers: getHeadersJson(idUser),
    });
    const json = await response.json()
    return json
}

export const getAllCards = (idUser: string) => {
    return async (dispatch: any) => {
        //pobieranie z api
        const cards = await fetchCards(idUser)
        // aktrualizacja stora (global)
        dispatch(setCards(cards))
    }
};

const fetchAddCards = async (card: CardDto) => {
    await fetch('/api/addCard', {
        method: 'POST',
        body: JSON.stringify(card),
        headers: getHeadersJson(card.idUser),
    })
}

export const addCardToStore = (card: CardDto) => {
    return async (dispatch: any) => {
        await fetchAddCards(card)
        dispatch(addCard(card));
    }
};

const fetchDeleteCards = async (cardId: string, idUser: string) => {
    await fetch(`/api/deleteCard?id=${cardId}`, {
        method: 'DELETE',
        headers: getHeadersJson(idUser),
    })
}

export const deleteCardFromStore = (cardId: string, idUser: string) => {
    return async (dispatch: any) => {
        await fetchDeleteCards(cardId, idUser)
        dispatch(deleteCard(cardId));
    }
};

const fetchEditCard = async (card: CardDto) => {
    await fetch('/api/saveEditCard', {
        method: 'POST',
        body: JSON.stringify(card),
        headers: getHeadersJson(card.idUser),
    })
}

export const saveEditCardStore = (card: CardDto) => {
    return async (dispatch: any) => {
        await fetchEditCard(card)
        dispatch(saveEditCard(card));
    }
}

export const getCardsToTodayReview = async (idUser: string) => {
    const response = await fetch(`/api/getCardsToReview?idUser=${idUser}`, {
        method: 'GET',
        headers: getHeadersJson(idUser),
    });
    const json = await response.json()
    return json
}


export const updateCardFromTodayReview = async (card: CardDto) => {
    await fetch('/api/saveReviewedCard', {
        method: 'PATCH',
        body: JSON.stringify(card),
        headers: getHeadersJson(card.idUser),
    })
}
