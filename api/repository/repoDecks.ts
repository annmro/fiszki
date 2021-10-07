import Deck from '../models/deck';
import { Connection } from 'tedious';
import { Request, TYPES } from 'tedious';
import { set } from 'lodash';

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

function getAllDecksExecuteStatement(connection: Connection, idUser: string | undefined, runIfFoundDecks: (decks: Deck[]) => void) {
    const request = new Request("SELECT id, name, idUser FROM dbo.decks WHERE idUser=@idUser", function (err) {
        if (err) {
            console.log(err);
        }
    });
    const allDecks: Deck[] = []
    request.addParameter('idUser', TYPES.UniqueIdentifier, idUser);
    request.on('row', function (columns) {
        let rawObject: Deck = {} as Deck;
        columns.forEach(function (column) {
            set(rawObject, column.metadata.colName, column.value)
            // rawObject[column.metadata.colName] = column.value;
        });
        allDecks.push(rawObject);
    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function () {
        runIfFoundDecks(allDecks);
        connection.close();
    });
    connection.execSql(request);
}

export function getAllDecks(idUser: string | undefined, iFoundDecks: (decks: Deck[]) => void) {
    const connection = new Connection(config)
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            getAllDecksExecuteStatement(connection, idUser, iFoundDecks)
        }
    })
    connection.connect();
}



function addDeckExecuteStatement(connection: Connection, deck: Deck) {
    const request = new Request("INSERT dbo.decks (Id, name, idUser) VALUES (@Id, @name, @idUser);", function (err) {
        if (err) {
            console.log(err);
        }
    });
    request.addParameter('Id', TYPES.UniqueIdentifier, deck.id);
    request.addParameter('name', TYPES.NVarChar, deck.name);
    request.addParameter('idUser', TYPES.UniqueIdentifier, deck.idUser);
    request.on('row', function (columns) {
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                console.log("Product id of inserted item is " + column.value);
            }
        });
    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function () {
        connection.close();
    });
    connection.execSql(request);
}
export function addDeck(deck: Deck) {
    const connection = new Connection(config)
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            addDeckExecuteStatement(connection, deck)
        }
    })
    connection.connect();
}

function deleteDeckExecuteStatement(connection: Connection, deckId: string) {
    const request = new Request("DELETE FROM dbo.decks WHERE Id=@id", function (err) {
        if (err) {
            console.log(err);
        }
    });
    request.addParameter('Id', TYPES.UniqueIdentifier, deckId);
    request.on('row', function (columns) {
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                console.log("Product id of inserted item is " + column.value);
            }
        });
    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function () {
        connection.close();
    });
    connection.execSql(request);
}
export function deleteDeck(deckId: string) {
    const connection = new Connection(config)
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            deleteDeckExecuteStatement(connection, deckId)
        }
    })
    connection.connect();
}

function getDeckExecuteStatement(connection: Connection, deckId: string) {
    const request = new Request("SELECT id, name FROM dbo.decks WHERE Id=@id", function (err) {
        if (err) {
            console.log(err);
        }
    });
    request.addParameter('Id', TYPES.UniqueIdentifier, deckId);
    request.on('row', function (columns) {
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                console.log("Product id of inserted item is " + column.value);
            }
        });
    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function () {
        connection.close();
    });
    connection.execSql(request);
}
export function getDeck(deckId: string) {
    const connection = new Connection(config)
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            getDeckExecuteStatement(connection, deckId)
        }
    })
    connection.connect();
}

function updateDeckExecuteStatement(connection: Connection, deck: Deck) {
    const request = new Request("UPDATE dbo.decks SET name=@name WHERE Id=@id", function (err) {
        if (err) {
            console.log(err);
        }
    });
    request.addParameter('id', TYPES.UniqueIdentifier, deck.id);
    request.addParameter('name', TYPES.NVarChar, deck.name);


    request.on('row', function (columns) {
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                console.log("Product id of inserted item is " + column.value);
            }
        });
    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function () {
        connection.close();
    });
    connection.execSql(request);
}


export function saveEditDeck(deck: Deck) {
    const connection = new Connection(config)
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            updateDeckExecuteStatement(connection, deck);
        }
    })
    connection.connect();
}

