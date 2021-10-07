
import { addDeck, getAllDecks, deleteDeck, saveEditDeck } from '../repository/repoDecks'
import { getAllCards } from '../repository/repoCards';
import Deck from '../models/deck';
import DeckDto from '../modelsDto/deckDto';
import CardDto from '../modelsDto/cardDto';
import { authorizeRequest } from '../middleware/authMiddleware';
import bodyParser from 'body-parser';
import { Application, Request, Response } from 'express';
import Card from '../models/card';
import { toString } from 'lodash';

const jsonParser = bodyParser.json();

export const DeckController = (app: Application) => {
    app.post('/api/addDeck', jsonParser, authorizeRequest, (req: Request, res: Response) => {
        const nDeck: Deck = {
            id: req.body.id,
            name: req.body.name,
            idUser: req.body.idUser
        }
        addDeck(nDeck)
        res.end()
    });

    app.get('/api/getDecks', authorizeRequest, (req, res) => {

        let cardsDeckDtos: CardDto[];
        const userId: string | undefined = req.headers.authorization;
        getAllCards(toString(userId), iFoundCards);

        function iFoundCards(foundedCards: Card[]) {
            cardsDeckDtos = foundedCards.map((card: Card) => {
                return {
                    id: card.id,
                    front: card.front,
                    back: card.back,
                    idDeck: card.idDeck,
                    idUser: card.idUser
                } as CardDto
            });
            getAllDecks(userId, iFoundDecks);
        }
        function iFoundDecks(foundedDecks: Deck[]) {
            const deckDtos: DeckDto[] = foundedDecks.map((deck: Deck) => {
                return {
                    id: deck.id,
                    name: deck.name,
                    idUser: deck.idUser,
                    cards: cardsDeckDtos.filter((card: CardDto) => card.idDeck === deck.id)
                } as DeckDto
            });
            res.json(deckDtos);
        }
    });

    app.delete('/api/deleteDeck', authorizeRequest, (req, res) => {
        const deckIdToDelete = req.query.id;
        deleteDeck(toString(deckIdToDelete));
        res.end();
    });

    app.post('/api/saveEditDeck', jsonParser, authorizeRequest, (req, res) => {
        const editDeck = req.body;
        saveEditDeck(editDeck);
        res.end();
    });
}