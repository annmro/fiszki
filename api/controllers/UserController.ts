
import { isUserLoginExist, addNewUser, logInUser } from '../repository/repoUsers'
import User from '../models/user';
import UserInfoDto from '../modelsDto/userInfoDto';
import { v4 as uuid } from 'uuid';
import bodyParser from 'body-parser';
import { Application } from 'express';

const jsonParser = bodyParser.json();

export const UserController = (app: Application) => {
    app.post('/api/registerUser', jsonParser, (req, res) => {
        const user = req.body;
        const nUser: User = {
            id: uuid(),
            login: user.login,
            password: user.passHash
        }
        isUserLoginExist(req.body.login, (isExist: boolean) => {
            if (isExist === false) {
                addNewUser(nUser, (isRegistered: boolean) => {
                    if (isRegistered) {
                        console.log("użytkownik dodany");
                        res.send(true);
                    } else {
                        res.send(false);
                    }
                });
            } else {
                console.log("użytkownik istnieje");
                res.send(false);
            }
        })
    })

    app.post('/api/logInUser', jsonParser, (req, res) => {
        const userDto = req.body;
        const user: User = {
            id: null,
            login: userDto.login,
            password: userDto.passHash
        }

        try {
            logInUser(user, (loggedUser: UserInfoDto) => {

                console.log("loggedUser", loggedUser);
                if (loggedUser === null) {
                    console.log("Uzytkownik lub hasło jest niepoprawne");
                    const userInfo: UserInfoDto = {
                        id: null,
                        login: null,
                        isLogged: false
                    }
                    res.send(userInfo);

                } else {
                    console.log("użytkownik zalogowany");
                    const userInfo: UserInfoDto = {
                        id: loggedUser.id,
                        login: loggedUser.login,
                        isLogged: true
                    }
                    res.send(userInfo);
                }
            })
        } catch (ex) {
            console.log(ex);
            res.send(false);
        }
    })
}