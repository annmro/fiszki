
import { validate as uuidValidate } from 'uuid';
import { isUserIdExist } from '../repository/repoUsers'
import { Application, Request, Response } from 'express';
import { toString } from 'lodash';

export const authorizeRequest = (req: Request, res: Response, next: () => void) => {
    const authorizationId: string | undefined = req.headers.authorization;
    const isValid = uuidValidate(toString(authorizationId));
    if (!isValid) {
        res.status(401).send();
        return;
    }
    isUserIdExist(authorizationId, (isExist: boolean) => {
        if (isExist) {
            next()
        } else {
            res.status(401).send();
            return;
        }
    })
}