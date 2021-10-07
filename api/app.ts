
import { DeckController } from './controllers/DeckController'
import { CardController } from './controllers/CardController';
import { UserController } from './controllers/UserController';
import express, { Application } from 'express';

const app: Application = express();
const port: number = 3000;

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

DeckController(app);
CardController(app);
UserController(app);