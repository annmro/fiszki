import { getAllCards, addCard, deleteCard, saveEditCard, getAllCardsToReview, updateReviewedCard } from '../repository/repoCards'
import Card from '../models/card';
import CardDto from '../modelsDto/cardDto';
import CardRevDto from '../modelsDto/cardRevDto';
import { authorizeRequest } from '../middleware/authMiddleware';
import bodyParser from 'body-parser';
import { Application } from 'express';
import { toString } from 'lodash';

const jsonParser = bodyParser.json();

export const CardController = (app: Application) => {

    app.get('/api/cards', authorizeRequest, (req, res) => {

        const userId: string | undefined = req.headers.authorization;
        function iFoundCards(foundedCards: Card[]) {
            const cardDtos = foundedCards.map((card: Card) => {
                return {
                    id: card.id,
                    front: card.front,
                    back: card.back,
                    idDeck: card.idDeck,
                    idUser: card.idUser
                } as CardDto
            });
            res.json(cardDtos);
        }
        getAllCards(toString(userId), iFoundCards);
    });

    app.post('/api/addCard', jsonParser, authorizeRequest, (req, res) => {
        //req.body is cardDto
        const nCard: Card = {
            id: req.body.id,
            front: req.body.front,
            back: req.body.back,
            reviewDate: null,
            idUser: req.body.idUser,
            idDeck: req.body.idDeck,
            lastDaysToReview: null
        }
        addCard(nCard);
        res.end();
    });

    app.delete('/api/DeleteCard', authorizeRequest, (req, res) => {
        const cardId = req.query.id;
        deleteCard(toString(cardId));
        res.end();
    });

    app.post('/api/saveEditCard', jsonParser, authorizeRequest, (req, res) => {
        const editCard: Card = {
            id: req.body.id,
            front: req.body.front,
            back: req.body.back,
            reviewDate: null,
            idUser: null,
            idDeck: req.body.idDeck,
            lastDaysToReview: null
        }
        saveEditCard(editCard);
        res.end();
    });

    app.get('/api/getCardsToReview', jsonParser, authorizeRequest, (req, res) => {
        function foundReviewCards(foundedCardsToReview: Card[]) {
            const cardsDtosToReview = foundedCardsToReview.map((card: Card) => {
                return {
                    id: card.id,
                    front: card.front,
                    back: card.back,
                    idDeck: card.idDeck,
                    idUser: card.idUser,
                    lastDaysToReview: card.lastDaysToReview
                } as CardDto
            })
            res.json(cardsDtosToReview);
        }
        getAllCardsToReview(toString(req.query.idUser), foundReviewCards);
    });

    app.patch('/api/saveReviewedCard', jsonParser, authorizeRequest, (req, res) => {
        const revCard: CardRevDto = {
            id: req.body.id,
            reviewDate: req.body.reviewDate,
            lastDaysToReview: req.body.lastDaysToReview,
        }
        updateReviewedCard(revCard);
        res.end();
    });
}