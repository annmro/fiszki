import Card from '../models/card';
import { Connection } from 'tedious';
import { Request, TYPES } from 'tedious';
import { set } from 'lodash';
import CardRevDto from '../modelsDto/cardRevDto';

const config = {
    server: 'mkprivdbserver.database.windows.net',
    authentication: {
        type: 'default',
        options: {
            userName: 'kacperAM',
            password: 'Radomiak1984'
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'fiszkidb', //update me
        rowCollectionOnRequestCompletion: true
    }
}

export function getAllCards(idUser: string | undefined, iFoundCards: (cards: Card[]) => void) {
    const connection = new Connection(config)
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            ExecuteStatement(connection, idUser, iFoundCards)
        }
    })
    connection.connect();

    const ExecuteStatement = (connection: Connection, idUser: string | undefined, runIfFoundCards: (cards: Card[]) => void) => {
        const request = new Request("SELECT id, front, back, idDeck, idUser FROM dbo.cards WHERE idUser=@idUser", function (err) {
            if (err) {
                console.log(err);
            }
        });
        const allCards: Card[] = []
        request.addParameter('idUser', TYPES.UniqueIdentifier, idUser);
        request.on('row', function (columns) {
            let rawObject: Card = {} as Card;
            columns.forEach(function (column) {
                set(rawObject, column.metadata.colName, column.value);
                //rawObject[column.metadata.colName] = column.value;
            });
            console.log("rawObject", rawObject);
            allCards.push(rawObject);

        });

        request.on('requestCompleted', function () {
            runIfFoundCards(allCards);
            console.log("allCards API", allCards);
            connection.close();
        });
        connection.execSql(request);
    }
}


export function addCard(card: Card) {

    const connection = new Connection(config)
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            ExecuteStatement(connection, card)
        }
    })
    connection.connect();

    const ExecuteStatement = (connection: Connection, card: Card) => {
        const request = new Request("INSERT dbo.cards (Id, front, back, IdDeck, IdUser) VALUES (@Id, @Front, @Back, @idDeck, @idUser);", function (err) {
            if (err) {
                console.log(err);
            }
        });
        request.addParameter('Id', TYPES.UniqueIdentifier, card.id);
        request.addParameter('front', TYPES.NVarChar, card.front);
        request.addParameter('back', TYPES.NVarChar, card.back);
        request.addParameter('idDeck', TYPES.UniqueIdentifier, card.idDeck);
        request.addParameter('idUser', TYPES.UniqueIdentifier, card.idUser);
        request.on('row', function (columns) {
            columns.forEach(function (column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    console.log("Product id of inserted item is " + column.value);
                }
            });
        });

        request.on("requestCompleted", function () {
            connection.close();
        });
        connection.execSql(request);
    }
}


export function deleteCard(cardId: string | undefined) {
    console.log("deleteCardFunction", cardId);
    const connection = new Connection(config)
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            ExecuteStatement(connection, cardId)
        }
    })
    connection.connect();

    const ExecuteStatement = (connection: Connection, cardId: string | undefined) => {
        const request = new Request("DELETE FROM dbo.cards WHERE Id=@id", function (err) {
            if (err) {
                console.log(err);
            }
        });
        request.addParameter('id', TYPES.UniqueIdentifier, cardId);

        request.on('row', function (columns) {
            columns.forEach(function (column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    console.log("Product id of inserted item is " + column.value);
                }
            });
        });
        request.on("requestCompleted", function () {
            connection.close();
        });
        connection.execSql(request);
    }
}


export function saveEditCard(card: Card) {
    console.log("saveEditCard", card);
    const connection = new Connection(config)
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            ExecuteStatement(connection, card);
        }
    })
    connection.connect();

    const ExecuteStatement = (connection: Connection, card: Card) => {

        const request = new Request("UPDATE dbo.cards SET front=@front, back=@back, IdDeck=@idDeck WHERE Id=@id", function (err) {
            if (err) {
                console.log(err);
            }
        });
        request.addParameter('id', TYPES.UniqueIdentifier, card.id);
        request.addParameter('front', TYPES.NVarChar, card.front);
        request.addParameter('back', TYPES.NVarChar, card.back);
        request.addParameter('idDeck', TYPES.UniqueIdentifier, card.idDeck);

        request.on('row', function (columns) {
            columns.forEach(function (column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    console.log("Product id of inserted item is " + column.value);
                }
            });
        });

        request.on("requestCompleted", function () {
            connection.close();
        });
        connection.execSql(request);
    }
}


export function getAllCardsToReview(idUser: string | undefined, iFoundCards: (cards: Card[]) => void) {
    const connection = new Connection(config)
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            executeStatement(connection, iFoundCards)
        }
    })
    connection.connect();

    const executeStatement = (connection: Connection, runIfFoundCards: (cards: Card[]) => void) => {

        const request = new Request("SELECT id, front, back, idDeck, reviewDate, lastDaysToReview, idUser FROM dbo.cards WHERE idUser=@idUser AND   (reviewDate<=@date OR reviewDate IS NULL)", function (err) {
            if (err) {
                console.log(err);
            }
        });
        const date = new Date()
        request.addParameter('date', TYPES.DateTime2, date)
        request.addParameter('idUser', TYPES.UniqueIdentifier, idUser);
        const allCards: Card[] = []
        request.on('row', function (columns) {
            let rawObject: Card = {} as Card;
            columns.forEach(function (column) {
                set(rawObject, column.metadata.colName, column.value)
                // rawObject[column.metadata.colName] = column.value;
            });
            allCards.push(rawObject);
        });
        request.on("requestCompleted", function () {
            runIfFoundCards(allCards);
            connection.close();
        });
        connection.execSql(request);
    }
}


export function updateReviewedCard(cardReview: CardRevDto) {

    const connection = new Connection(config)
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            ExecuteStatement(connection, cardReview);
        }
    })
    connection.connect();

    const ExecuteStatement = (connection: Connection, cardReview: CardRevDto) => {
        const request = new Request("UPDATE dbo.cards SET reviewDate=@reviewDate, lastDaysToReview=@lastDaysToReview WHERE Id=@id", function (err) {
            if (err) {
                console.log(err);
            }
        });
        request.addParameter('id', TYPES.UniqueIdentifier, cardReview.id);
        request.addParameter('reviewDate', TYPES.DateTime2, cardReview.reviewDate);
        request.addParameter('lastDaysToReview', TYPES.Int, cardReview.lastDaysToReview);

        request.on('row', function (columns) {
            columns.forEach(function (column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    console.log("Product id of inserted item is " + column.value);
                }
            });
        });
        request.on("requestCompleted", function () {
            connection.close();
        });
        connection.execSql(request);
    }
}


