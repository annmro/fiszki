
import { DeckController } from './controllers/DeckController'
import { CardController } from './controllers/CardController';
import { UserController } from './controllers/UserController';
import express, { Application } from 'express';
import { toNumber } from 'lodash';

const app: Application = express();
const portStr: string = process.env.PORT || '3000';
const port: number = toNumber(portStr);

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

DeckController(app);
CardController(app);
UserController(app);