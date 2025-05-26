import express from 'express';

import { PageRegister } from '../pages/public/PageRegister.js';
import { PageLogin } from '../pages/public/PageLogin.js';
import { PageLogout } from '../pages/public/PageLogout.js';
import { isNotLoggedIn } from '../middleware/isNotLoggedIn.js';

export const authRouter = express.Router();

authRouter.get('/register', isNotLoggedIn, async (req, res) => res.send(await (new PageRegister(req)).render()));
authRouter.get('/login', isNotLoggedIn, async (req, res) => res.send(await (new PageLogin(req)).render()));
authRouter.get('/logout', async (req, res) => res.send(await (new PageLogout(req)).render()));