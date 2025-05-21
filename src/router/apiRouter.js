import express from 'express';
import { apiRegister } from '../api/apiRegister.js';
import { apiLogin } from '../api/apiLogin.js';
import { apiLogout } from '../api/apiLogout.js';

export const apiRouter = express.Router();

apiRouter.post('/api/register', apiRegister);
apiRouter.post('/api/login', apiLogin);
apiRouter.get('/api/logout', apiLogout);