import express from 'express';
import { pageRouter } from './router/pageRouter.js';
import { apiRouter } from './router/apiRouter.js';
import { PORT } from './env.js';
import { cookieParser } from './middleware/cookieParser.js';
import { getUserData } from './middleware/getUserData.js';

const app = express();

app.use(cookieParser);
app.use(getUserData);

app.use(express.json());
app.use(express.static('public'));
app.use('/', apiRouter);
app.use('/', pageRouter);

app.listen(PORT, () => {
    console.log(`Serveris: http://localhost:${PORT}`);
});
