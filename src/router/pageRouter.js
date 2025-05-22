import express from 'express';
import { PageHome } from '../pages/public/PageHome.js';
import { Page404 } from '../pages/public/Page404.js';
import { PageMovies } from '../pages/public/PageMovies.js';
import { PageCategories } from '../pages/public/PageCategories.js';
import { PageMovieInner } from '../pages/public/PageMovieInner.js';
import { PageRegister } from '../pages/public/PageRegister.js';
import { PageLogin } from '../pages/public/PageLogin.js';
import { PageLogout } from '../pages/public/PageLogout.js';
import { PageCategoryInner } from '../pages/public/PageCategoryInner.js';

import { PageDashboard } from '../pages/admin/PageDashboard.js';

export const pageRouter = express.Router();

pageRouter.get('/', async (req, res) => res.send(await (new PageHome(req)).render()));
pageRouter.get('/movies', async (req, res) => res.send(await (new PageMovies(req)).render()));
pageRouter.get('/movies/:movieTitle', async (req, res) => res.send(await (new PageMovieInner(req)).render()));
pageRouter.get('/movies-by-category', async (req, res) => res.send(await (new PageCategories(req)).render()));
pageRouter.get('/movies-by-category/:categoryName', async (req, res) => res.send(await (new PageCategoryInner(req)).render()));

pageRouter.get('/register', async (req, res) => res.send(await (new PageRegister(req)).render()));
pageRouter.get('/login', async (req, res) => res.send(await (new PageLogin(req)).render()));
pageRouter.get('/logout', async (req, res) => res.send(await (new PageLogout(req)).render()));

pageRouter.get('/dashboard', async (req, res) => res.send(await (new PageDashboard(req)).render()));

pageRouter.get('*error', async (req, res) => res.send(await (new Page404(req)).render()));