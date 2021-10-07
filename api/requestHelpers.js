
import { validate as uuidValidate } from 'uuid';
import { isUserIdExist } from './repository/repoUsers'

export const authorizeRequest = (req, res, next) => {
    const authorizationId = req.headers.authorization;
    const isValid = uuidValidate(authorizationId);
    if (!isValid) {
        res.status(401).send();
        return;
    }
    isUserIdExist(authorizationId, (isExist) => {
        if (isExist) {
            next()
        } else {
            res.status(401).send();
        }
    })
}