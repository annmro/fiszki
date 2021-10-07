import User from '../models/user';
import { Connection } from 'tedious';
import { Request, TYPES } from 'tedious';
import UserInfoDto from '../modelsDto/userInfoDto';
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

// callback => (bool) => {}
export function isUserLoginExist(login: string, callback: (rowCount: boolean) => void) {

    const connection = new Connection(config)
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            ExecuteStatement(connection, login)
        }
    })
    connection.connect();

    const ExecuteStatement = (connection: Connection, login: string) => {
        const request = new Request("SELECT login FROM dbo.users WHERE login=@login;", function (err, rowCount) {
            if (err) {
                console.log(err);
            }
            callback(rowCount === 1)
        });
        request.addParameter('login', TYPES.NVarChar, login);

        request.on("requestCompleted", function () {
            connection.close();

        });
        connection.execSql(request);
    }
}

export function isUserIdExist(userId: string | undefined, callback: (rowCount: boolean) => void) {

    const connection = new Connection(config)
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            ExecuteStatement(connection, userId)
        }
    })
    connection.connect();

    const ExecuteStatement = (connection: Connection, userId: string | undefined) => {
        const request = new Request("SELECT id FROM dbo.users WHERE id=@userId;", function (err, rowCount) {
            if (err) {
                console.log(err);
            }
            callback(rowCount === 1)
        });
        request.addParameter('userId', TYPES.UniqueIdentifier, userId);

        request.on("requestCompleted", function () {
            connection.close();

        });
        connection.execSql(request);
    }
}

export function addNewUser(user: User, callback: (isRegister: boolean) => void) {

    const connection = new Connection(config)
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            ExecuteStatement(connection, user)
        }
    })
    connection.connect();

    const ExecuteStatement = (connection: Connection, user: User) => {

        const request = new Request("INSERT dbo.users (Id, login, passHash) VALUES (@Id, @login, @password);", function (err) {
            if (err) {
                console.log(err);
                isRegistered = false;
            }
        });
        request.addParameter('Id', TYPES.UniqueIdentifier, user.id);
        request.addParameter('login', TYPES.NVarChar, user.login);
        request.addParameter('password', TYPES.NVarChar, user.password);

        let isRegistered = true;
        request.on("requestCompleted", function () {
            connection.close();
            callback(isRegistered)
        });

        connection.execSql(request);
    }
}

export function logInUser(user: User, callback: (user: UserInfoDto) => void) {

    const connection = new Connection(config)
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            ExecuteStatement(connection, user)
        }
    })
    connection.connect();

    const ExecuteStatement = (connection: Connection, user: User) => {

        const request = new Request("SELECT id AS id, login FROM dbo.users WHERE login=@login AND passHash=@password;", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            }
        });
        let rawObject: UserInfoDto = {} as UserInfoDto;
        request.addParameter('login', TYPES.NVarChar, user.login);
        request.addParameter('password', TYPES.NVarChar, user.password);
        request.on("row", function (columns) {

            columns.forEach(function (column) {
                set(rawObject, column.metadata.colName, column.value)
                // rawObject[column.metadata.colName] = column.value;
            })
            console.log("rawObject", rawObject);
        })
        request.on("requestCompleted", function () {
            callback(rawObject)
            connection.close();
        });

        connection.execSql(request);
    }
}